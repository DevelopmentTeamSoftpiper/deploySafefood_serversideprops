import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

const router = createRouter().use(verifyTokenAndAdmin);

router.put(async (req, res) => {
  try {
    const { id, isActive } = req.body;
    db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      isActive,
    });
    db.disconnectDb();
    return res.json({
      message: "Coupon has been updated successfully",
      status: true,
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
