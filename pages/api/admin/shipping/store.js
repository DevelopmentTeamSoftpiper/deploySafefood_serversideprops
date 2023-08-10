import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Shipping from "@/models/Shipping";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const { name, cost, description } = req.body;
    db.connectDb();
    const test = await Shipping.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Shipping Method already exists, Try a different name",
        });
    }
    await new Shipping({ name, cost, description }).save();

    db.disconnectDb();
    res.json({
      status: true,
      message: `Shipping Method  ${name} has been created successfully.`,
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
