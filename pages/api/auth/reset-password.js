import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { sendEmailWithNodemailer } from "@/helpers/emails";
import _ from "lodash";
import applyCors from "@/middleware/cors";
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import axios from "axios";
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

    const { token, number, password } = req.body;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (err) {
          // console.log("JWT verify account activation error");
          return res.status(401).json({
            error: "Expired link",
          });
        }
        if (decoded) {
          const { email, randomNumber } = jwt.decode(token);
          // console.log(email, randomNumber);

          if (number == randomNumber) {
            const findUser = await User.findOne({ email: email });
            if (!findUser) {
              return res.status(400).json({
                error: "User with this email does not exist.",
              });
            }

            const updatedFields = { password: password };
            const user = _.extend(findUser, updatedFields);
            const updatedUser = await user.save();
            if (!updatedUser) {
              return res.status(400).json({
                error: "Error resetting password",
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
      });
    }
  } catch (error) {
    return res.json({
      message: "something went wrong",
    });
  }
});

export default applyCors(router.handler());
