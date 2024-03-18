import { createRouter } from "next-connect";
import db from "../../../utils/db";

import jwt from "jsonwebtoken";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import applyCors from "@/middleware/cors";
import axios from "axios";
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { verifyCaptcha } from "@/utils/helper";
import { getIpAddress, rateLimiterMiddleware } from "@/utils/rate-limiter";

const router = createRouter();

router.post(async (req, res) => {
  try {

    const { name, email, password, captcha } = req.body;

    const verify = await verifyCaptcha(captcha);

    if (!verify)
      return res.status(400).json({
        error: "Your are not verified user",
      });

      const ip = await getIpAddress();
      if (ip !== null) {
        if (!rateLimiterMiddleware(ip)) {
          return res.status(400).json({
            error: `Too Many Requests. Try again ${RATE_LIMIT_TIME_MIN} after  minutes.`,
          });
        }
      }

    
    db.connectDb();
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists. Please log in." });
    }
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign(
      { name, email, password, randomNumber },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "5m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION CODE",
      html: `
                  <h1>Please use the 6 digit verification code to complete the signup process. </h1>
                  <h3> ${randomNumber}</h3>
                  <p>The code is valid for 5 minutes only.</p>
                  <hr />
              `,
    };
    sendEmailWithNodemailer(req, res, emailData);
    db.disconnectDb();
    return res.json({
      message: "Waiting for Verification.",
      token: token,
      verification_number: randomNumber,
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
