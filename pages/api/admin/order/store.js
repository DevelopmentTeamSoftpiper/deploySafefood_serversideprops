import { createRouter } from "next-connect";
import {  verifyToken, verifyTokenAndAuthorization } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Order from "@/models/Order";
import axios from "axios";

const router = createRouter().use(verifyToken).use(verifyTokenAndAuthorization);
// .use(verifyTokenAndAdmin);

router.post(async (req, res) => {
  try {
    const {
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
      user_id_no,
    } = req.body;

    db.connectDb();

    const order = await new Order({
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
      user_id_no,
    }).save();
    const greenwebsms = new URLSearchParams();
    greenwebsms.append(
      "token",
      `${process.env.GREENWEB_API}`
    );
    greenwebsms.append("to", phone);
    greenwebsms.append("message", `প্রিয় ${name}, সেইফ ফুডে অর্ডারের জন্য ধন্যবাদ। খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।`);
    const response = await axios.post(
      "http://api.greenweb.com.bd/api.php",
      greenwebsms
    );

    db.disconnectDb();
    if (order) {
      res.json({
        status: true,
        message: `Order has been created successfully.`,
      });
    } else {
      res.json({
        status: false,
        message: `Something is wrong.`,
      });
    }
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
