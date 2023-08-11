import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import HomeBanner from "@/models/HomeBanner";

const router = createRouter().use(verifyTokenAndAdmin);
// const router = createRouter();

router.post(async (req, res) => {
  try {
    const { title, image, product } = req.body;
    db.connectDb();
    const test = await HomeBanner.findOne({ title });
    if (test) {
      return res.status(400).json({
        status: false,
        message: "Title already exist, Try a different title",
      });
    }
    await new HomeBanner({
      title,
      image,
      product,
    }).save();

    db.disconnectDb();
    res.json({
      status: true,
      message: `Banner ${title} has been created successfully.`,
      banners: await HomeBanner.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
