import { createRouter } from "next-connect";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import HomeBanner from "@/models/HomeBanner";
import Product from "@/models/Products";

// const router = createRouter().use(verifyTokenAndAdmin);
const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    await Product.find({});
    const banners = await HomeBanner.find({})
      .populate("product")
      .sort({ updatedAt: -1 })
      .lean();
    db.disconnectDb();
    return res.json({
      banners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
