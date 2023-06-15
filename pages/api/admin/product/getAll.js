import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Products";
import applyCors from "@/middleware/cors";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    const products = await Product.find({})
      .populate("category")
      .populate("subCategory")
      .sort({ updatedAt: -1 })
      .lean();
    db.disconnectDb();
    return res.json({
      products: products,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default applyCors(router.handler());
