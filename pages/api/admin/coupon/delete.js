import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

// const router = createRouter().use(verifyTokenAndAdmin);
const router = createRouter();

router.delete(async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    db.connectDb();
    await Coupon.findByIdAndRemove(id);
    db.disconnectDb();
    return res.json({
      message: "Coupon has been deleted successfully",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
