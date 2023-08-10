import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import PaymentMethods from "@/models/PaymentMethods";
import applyCors from "@/middleware/cors";

const router = createRouter().use(verifyTokenAndAdmin);

router.put(async (req, res) => {
  try {
    const { id, name, description } = req.body;
    db.connectDb();
    const updated = await PaymentMethods.findByIdAndUpdate(id, {
      name,
      description,
    });
    db.disconnectDb();
    if (updated) {
      return res.json({
        status: true,
        message: "Payment Method has been updated successfully",
      });
    } else {
      return res.json({
        status: false,
        message: "Payment Method not found with this id",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
