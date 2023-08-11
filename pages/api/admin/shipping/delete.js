import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import Shipping from "@/models/Shipping";
import applyCors from "@/middleware/cors";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      db.connectDb();
      await Shipping.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        status: true,
        message: "Shipping has been deleted successfully",
        Shippings: await Shipping.find({}).sort({ updatedAt: -1 }),
      });
    } else {
      return res.json({
        status: false,
        message: "Shipping not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
