import { createRouter } from "next-connect";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "@/helpers/verityToken";
import db from "@/utils/db";
import Category from "@/models/Category";
import slugify from "slugify";
import applyCors from "@/middleware/cors";
import User from "@/models/User";
import _ from "lodash";
const router = createRouter().use(verifyToken);

router.post(async (req, res) => {
  try {
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
