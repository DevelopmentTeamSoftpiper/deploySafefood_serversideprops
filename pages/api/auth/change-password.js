import { createRouter } from "next-connect";
import { verifyToken } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import User from "@/models/User";
import _ from "lodash";
import { IP_ADDRESS_URL, RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { rateLimiterMiddleware } from "@/utils/helper";
const router = createRouter().use(verifyToken);

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

    const { id , updatedPassword,password} = req.body;
    db.connectDb();
    const findUser = await User.findOne({_id:id});
    
    // console.log(findUser);

    db.disconnectDb();
    if (findUser) {
      if(!findUser.authenticate(password)){
        return res.status(400).json({
          error: 'Current Password is incorrect. Try forgot password'
        })
      }
     const updatedFields = {password:updatedPassword};
     const user =_.extend(findUser, updatedFields);
     const updatedUser = await user.save();
     if(!updatedUser){
      return res.status(400).json({
        error: "Error resetting password",
      });
    }
    return res.status(200).json({
      message: "Success!",
    });
    } else {
      return res.json({
        status: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
