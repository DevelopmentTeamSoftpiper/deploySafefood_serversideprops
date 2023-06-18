import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";

import slugify from "slugify";
import Product from "@/models/Products";
import applyCors from "@/middleware/cors";
import Order from "@/models/Order";

const router = createRouter().use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const {
        id,
        products,
        name,
        email,
        phone,
        address,
        city,
        post_code,
        country,
        shipping_cost,
        payment_method,
        transaction_phone_no,
        transaction_id,
        subtotal,
        total,
        status,
        payment_status,
        delivery_status,
        order_notes,
        isPaid,
        user_id_no,
    } = req.body;

    db.connectDb();

    const updated = await Order.findByIdAndUpdate(id, {
        products,
        name,
        email,
        phone,
        address,
        city,
        post_code,
        country,
        shipping_cost,
        payment_method,
        transaction_phone_no,
        transaction_id,
        subtotal,
        total,
        status,
        payment_status,
        delivery_status,
        isPaid,
        order_notes,
 
    });
    db.disconnectDb();
    if (updated) {
      return res.json({
        status: true,
        message: "Order has been updated successfully",
      });
    } else {
      return res.json({
        status: false,
        message: "Order not found with this id",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
