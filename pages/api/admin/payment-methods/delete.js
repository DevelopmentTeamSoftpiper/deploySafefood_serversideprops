import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import PaymentMethods from "@/models/PaymentMethods";
import applyCors from "@/middleware/cors";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();
    const deleted = await PaymentMethods.findByIdAndRemove(id);
    db.disconnectDb();
    if (deleted) {
      return res.json({
        status: true,
        message: "Payment Method has been deleted successfully",
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
