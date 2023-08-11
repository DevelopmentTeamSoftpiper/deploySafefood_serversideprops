import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";

import applyCors from "@/middleware/cors";
import Shipping from "@/models/Shipping";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    const shippings = await Shipping.find({}).sort({ updatedAt: -1 });
    db.disconnectDb();
    return res.json({
      shippings: shippings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
