import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const homeBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
});

const HomeBanner =
  mongoose.models.HomeBanner || mongoose.model("HomeBanner", homeBannerSchema);

export default HomeBanner;
