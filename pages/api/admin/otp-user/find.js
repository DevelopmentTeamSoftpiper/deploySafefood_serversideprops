import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';
import Product from '@/models/Products';
import applyCors from '@/middleware/cors';
import Blog from '@/models/Blog';
import SubBlog from '@/models/SubBlog';
import OtpUser from '@/models/OtpUser';


const router = createRouter();

router.get(async(req, res)=>{
    try {
      const  phone = req.body.phone;
    //   console.log(phone);
        db.connectDb();

        const found = await OtpUser.findOne({phone:phone});
        db.disconnectDb();
        if(found){
          return res.json({
            message: "Blog has been found successfully",
            user: found
          });
        }else{
          return res.json({
            message: "Product not found with this id",
          });
        }
       
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default applyCors(router.handler());