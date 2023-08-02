import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    discount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    discountType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
