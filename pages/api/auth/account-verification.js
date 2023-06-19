import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import db from "../../../utils/db";

import jwt from "jsonwebtoken";
import slugify from "slugify";
import Category from "@/models/Category";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import applyCors from "@/middleware/cors";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { token, number } = req.body;
    // console.log(token, number);
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACCOUNT_ACTIVATION,
        async function (err, decoded) {
          if (err) {
            // console.log("JWT verify account activation error");
            return res.status(401).json({
              error: "Expired link. Sign up again",
            });
          }
          if (decoded) {
            const { name, email, password, randomNumber } = jwt.decode(token);
            // console.log(name, email, password, randomNumber);
            if (number == randomNumber) {
              db.connectDb();
              const user = new User({ name, email, password });

             const savedUser = await user.save();
             if(!savedUser){
              return res.status(400).json({
                error: "Something went wrong",
              });
            }
            return res.status(200).json({
              message: "Success!",
            });
            } else {
              return res.status(401).json({
                error: "Verification Number is incorrect",
              });
            }
          }
        }
      );
    }
  } catch (error) {
    return res.json({
      message: "something went wrong",
    });
  }
});

export default applyCors(router.handler());
