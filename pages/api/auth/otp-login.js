import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import db from "../../../utils/db";

import jwt from "jsonwebtoken";
import slugify from "slugify";
import Category from "@/models/Category";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import applyCors from "@/middleware/cors";
import axios from "axios";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const  phone  = req.body.phone;

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign(
      { phone, randomNumber },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "5m" }
    );

    const greenwebsms = new URLSearchParams();
    greenwebsms.append(
      "token",
      `${process.env.GREENWEB_API}`
    );
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
