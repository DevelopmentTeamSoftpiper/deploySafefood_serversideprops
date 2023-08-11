import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import HomeBanner from "@/models/HomeBanner";

// const router = createRouter().use(verifyTokenAndAdmin);
const router = createRouter();

router.post(async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      db.connectDb();
      await HomeBanner.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        status: true,
        message: "Banner has been deleted successfully"
      });
    } else {
      return res.json({
        status: false,
        message: "Banner not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
