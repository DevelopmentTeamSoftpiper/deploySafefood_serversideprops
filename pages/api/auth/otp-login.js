import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import applyCors from "@/middleware/cors";
import axios from "axios";
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { rateLimiterMiddleware } from "@/utils/helper";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const phone = req.body.phone;

    const ipAddress = await axios(IP_ADDRESS_URL);
    const ip = ipAddress.data.userPrivateIpAddress;
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
