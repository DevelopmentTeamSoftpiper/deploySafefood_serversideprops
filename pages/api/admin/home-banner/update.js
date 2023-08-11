import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import HomeBanner from "@/models/HomeBanner";

// const router = createRouter().use(verifyTokenAndAdmin);
const router = createRouter();

router.put(async (req, res) => {
  try {
    const { id, title, image, product } = req.body;
    
    db.connectDb();
    await HomeBanner.findByIdAndUpdate(id, {
      title,
      image,
      product,
    });
    db.disconnectDb();
    return res.json({
      message: "Banner has been updated successfully",
      status: true,
      banners: await HomeBanner.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
