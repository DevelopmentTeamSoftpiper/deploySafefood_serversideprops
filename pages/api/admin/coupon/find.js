import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

const router = createRouter();


router.get(async (req, res) => {
  try {
    db.connectDb();
    const { coupon } = req.query;

    const existCoupon = await Coupon.findOne({ coupon: coupon });
    db.disconnectDb();

    if (existCoupon?.isActive) {
      return res.json({
        status: true,
        existCoupon,
      });
    } else {
      return res.json({
        status: false,
        message: "Coupon not valid Try again!",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
