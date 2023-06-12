import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import User from "@/models/User";

const router = createRouter().use(verifyTokenAndAdmin);


router.post(async (req, res) => {
  try {
    const { id } = req.body;
    const exist = await User.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await User.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "User has been deleted Successfully",
        status: true,
      
      });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "User Not Exist Please try to delete exist category",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default applyCors(router.handler());
