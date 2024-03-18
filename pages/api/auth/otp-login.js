import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import applyCors from "@/middleware/cors";
import axios from "axios";
import { RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { verifyCaptcha } from "@/utils/helper";
import { getIpAddress, rateLimiterMiddleware } from "@/utils/rate-limiter";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { phone, captcha } = req.body;
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

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign(
      { phone, randomNumber },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "5m" }
    );

    const greenwebsms = new URLSearchParams();
    greenwebsms.append("token", `${process.env.GREENWEB_API}`);
    greenwebsms.append("to", phone);
    greenwebsms.append("message", `আপনার সেইফফুড লগইন OTP: ${randomNumber}`);
    const response = await axios.post(
      "http://api.greenweb.com.bd/api.php",
      greenwebsms
    );
    if (response) {
      return res.json({
        message: "Waiting for Verification.",
        token: token,
        otp: randomNumber,
      });
    } else {
      return res.json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
