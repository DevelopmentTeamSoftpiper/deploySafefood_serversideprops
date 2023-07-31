import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

// const router = createRouter().use(verifyTokenAndAdmin);
const router = createRouter();

router.put(async (req, res) => {
  try {
    const {
      id,
      coupon,
      discount,
      startDate,
      endDate,
      isActive,
      discountOption,
    } = req.body;
    db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
      isActive,
      discountOption,
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
