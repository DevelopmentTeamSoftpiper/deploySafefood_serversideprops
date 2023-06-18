import { createRouter } from "next-connect";
import { verifyTokenAndAdmin } from "@/helpers/verityToken";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import Blog from "@/models/Blog";
import SubBlog from "@/models/SubBlog";


const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    await SubBlog.find({});
    const blogs = await Blog.find({}).populate('subBlog')
      .sort({ updatedAt: -1 }).limit(5);;
    db.disconnectDb();
    return res.json({
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
