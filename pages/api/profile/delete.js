import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Order from "@/models/Order";
import Profile from "@/models/Profile";

const router = createRouter().use(verifyTokenAndAdmin);


router.post(async (req, res) => {
  try {
    const { id } = req.body;
    const exist = await Order.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await Profile.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "Profile has been deleted Successfully",
        status: true,
      
      });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "Profile Not Exist with this id.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default applyCors(router.handler());
