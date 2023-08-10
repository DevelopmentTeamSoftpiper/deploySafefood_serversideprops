import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Coupon from "@/models/Coupon";

const router = createRouter().use(verifyTokenAndAdmin);


router.post(async (req, res) => {
  try {
    const { coupon, discount, isActive, discountType } = req.body;
    db.connectDb();
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res.status(400).json({
        status: false,
        message: "Coupon already exist, Try a different coupon",
      });
    }
    await new Coupon({
      coupon,
      discount,
      isActive,
      discountType,
    }).save();

    db.disconnectDb();
    res.json({
      status: true,
      message: `Coupon ${coupon} has been created successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
