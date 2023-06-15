import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';

import applyCors from '@/middleware/cors';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';


const router = createRouter();

router.get(async(req, res)=>{
    try {
        db.connectDb();
        const categories =await Category.find({}).populate({path:'subCategories',model: SubCategory}).sort({ updatedAt: -1 });
        db.disconnectDb();
        return res.json({
          categories: categories,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default applyCors(router.handler());