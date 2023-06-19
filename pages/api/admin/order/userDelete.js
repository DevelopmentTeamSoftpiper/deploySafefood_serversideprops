import { createRouter } from "next-connect";
import { verifyToken, verifyTokenAndAuthorization } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Order from "@/models/Order";

const router = createRouter().use(verifyToken).use(verifyTokenAndAuthorization);


router.post(async (req, res) => {
  try {
    db.connectDb();
    const  {id}  = req.body;
    // console.log(id);
    const exist = await Order.findOne({ _id: id });
    if (exist) {
      await Order.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "Order has been deleted Successfully",
        status: true,
      
      });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "Order Not Exist Please try to delete exist category",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default applyCors(router.handler());
