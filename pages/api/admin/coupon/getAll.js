import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

const router = createRouter().use(verifyTokenAndAdmin);

router.get(async (req, res) => {
  try {
    db.connectDb();
    await Coupon.find({});
    const coupons = await Coupon.find({}).sort({ updatedAt: -1 });
    db.disconnectDb();
    return res.json({
      coupons: coupons,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
