import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import PaymentMethods from "@/models/PaymentMethods";
import applyCors from "@/middleware/cors";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const { name, description } = req.body;
    db.connectDb();
    const test = await PaymentMethods.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Payment Method already exists, Try a different name",
        });
    }
    await new PaymentMethods({ name, description }).save();

    db.disconnectDb();
    res.json({
      status: true,
      message: `PaymentMethods ${name} has been created successfully.`,
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
