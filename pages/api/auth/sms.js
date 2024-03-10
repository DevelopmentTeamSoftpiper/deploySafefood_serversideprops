import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import applyCors from "@/middleware/cors";
import axios from "axios";
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { rateLimiterMiddleware } from "@/utils/helper";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const ipAddress = await axios(IP_ADDRESS_URL);
    const ip = ipAddress.data.userPrivateIpAddress;
    if (ip !== null) {
      if (!rateLimiterMiddleware(ip)) {
        return res.status(400).json({
          error: `Too Many Requests. Try again ${RATE_LIMIT_TIME_MIN} after  minutes.`,
        });
      }
    }

    const mobileNo = req.body.phone;
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const greenwebsms = new URLSearchParams();
    greenwebsms.append(
      "token",
      "948517180416865686840be5e1974826707e83bb808895339109"
    );
    greenwebsms.append("to", mobileNo);
    greenwebsms.append("message", `আপনার সেইফফুড লগইন OTP: ${randomNumber}`);
    const response = await axios.post(
      "http://api.greenweb.com.bd/api.php",
      greenwebsms
    );
    // console.log(response);
    if (response) {
      return res.status(200).json({ success: response.data });
    } else {
      return res.json({
        message: "SMS not sent",
      });
    }
  } catch (error) {
    // console.log(error);

    return res.json({
      message: "something went wrong",
    });
  }
});

export default applyCors(router.handler());
