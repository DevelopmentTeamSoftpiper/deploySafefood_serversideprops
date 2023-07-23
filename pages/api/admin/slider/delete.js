import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Slider from "@/models/Slider";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const { id } = req.body;
    const exist = await Slider.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await Slider.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "Slider has been deleted Successfully",
        status: true,
      });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "Slider Not Exist Please try to delete exist title",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
