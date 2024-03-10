import { createRouter } from 'next-connect';
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import User from '@/models/User';
import { sendEmailWithNodemailer } from '@/helpers/emails';
import applyCors from '@/middleware/cors';
import axios from 'axios';
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from '@/utils/constants';
import { rateLimiterMiddleware } from '@/utils/helper';


const router = createRouter();

router.post(async(req, res)=>{
    try{

      const ipAddress = await axios(IP_ADDRESS_URL);
      const ip = ipAddress.data.userPrivateIpAddress;
      if (ip !== null) {
        if (!rateLimiterMiddleware(ip)) {
          return res.status(400).json({
            error: `Too Many Requests. Try again ${RATE_LIMIT_TIME_MIN} after minutes.`,
          });
        }
      }



       const {email} = req.body;
       db.connectDb();
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({
            error: 'User with this email does not exist.'
          })
       }
       const randomNumber = Math.floor(100000 + Math.random() * 900000);
       const token = jwt.sign(
        { email, randomNumber },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
      );
      const emailData = {
        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
        subject: "PASSWORD RESET VERIFICATION CODE",
        html: `
                  <h1>Please use the following code  </h1>
                  <p>Enter the following number: ${randomNumber}</p>
                  <hr />
              `,
      };
   
   
      sendEmailWithNodemailer(req, res, emailData);
      return res.json({
        message: "Check your Email to get the verification code",
        token: token,
        verification_number:randomNumber
      });

    }catch(error){
        return res.json({
            message: "something went wrong",
          });
    }
})



export default applyCors(router.handler());