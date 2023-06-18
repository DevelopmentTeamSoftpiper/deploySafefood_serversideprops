import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import db from "../../../utils/db";

import jwt from "jsonwebtoken";
import slugify from "slugify";
import Category from "@/models/Category";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import applyCors from "@/middleware/cors";
import OtpUser from "@/models/OtpUser";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { token, number ,mobile} = req.body;
    console.log( number, mobile);
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACCOUNT_ACTIVATION,
        async function (err, decoded) {
          if (err) {
            
            return res.status(401).json({
              error: "Validation time Expired. Try login again",
            });
          }
          if (decoded) {
            const {randomNumber } = jwt.decode(token);
            console.log( randomNumber);
            if (number == randomNumber) {
              db.connectDb();
              const existingUser = await OtpUser.findOne({phone:mobile});
              console.log("existing",existingUser);
              if(existingUser){
                const token = jwt.sign({_id: existingUser._id, role: existingUser.role, provider: existingUser.provider}, process.env.JWT_SECRET, {expiresIn: '7d'});
                const {_id, phone, role, provider} = existingUser;
                return res.status(200).json({
                  'token': token, 
                  user:{_id, phone, role, provider},
                  message: 'Sign in successful'
            
                })
              }
                const newUser = new OtpUser({ phone:mobile });

                const savedUser = await newUser.save();
                if(!savedUser){
                 return res.status(400).json({
                   error: "Something went wrong",
                 });
               }
               const token = jwt.sign({_id: savedUser._id, role: savedUser.role, provider: savedUser.provider}, process.env.JWT_SECRET, {expiresIn: '7d'});
                const {_id, phone, role, provider} = savedUser;
                return res.status(200).json({
                  'token': token, 
                  user:{_id, phone, role, provider},
                  message: 'Sign in successful'
            
                })
              
        
            } else {
              return res.status(401).json({
                error: "OTP is incorrect",
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
