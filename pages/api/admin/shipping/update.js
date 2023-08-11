import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Shipping from "@/models/Shipping";

const router = createRouter().use(verifyTokenAndAdmin);

router.put(async (req, res) => {
  try {
    const { id, name, cost, description } = req.body;
    db.connectDb();
    await Shipping.findByIdAndUpdate(id, {
      name,
      cost,
      description,
    });
    db.disconnectDb();
    return res.json({
      message: "Shipping has been updated successfully",
      status: true,
      Shippings: await Shipping.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export default applyCors(router.handler());
