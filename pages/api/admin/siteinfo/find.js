import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';

import applyCors from '@/middleware/cors';
import Category from '@/models/Category';
import Slider from '@/models/Slider';
import Siteinfo from '@/models/Siteinfo';


const router = createRouter();

router.get(async(req, res)=>{
    try {
        db.connectDb();
        const siteinfo =await Siteinfo.findOne({}).sort({ updatedAt: 1 });
        db.disconnectDb();
        return res.json({
            siteinfo: siteinfo,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default applyCors(router.handler());