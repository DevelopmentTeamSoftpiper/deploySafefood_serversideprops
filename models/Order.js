import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    post_code: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    transaction_phone_no: {
      type: String,
      trim: true,
    },
    transaction_id: {
      type: String,
      trim: true,
    },
    user_id_no: {
      type: String,
      trim: true,
    },
    subtotal: {
      type: String,
      trim: true,
    },
    total: {
      type: String,
      trim: true,
    },
    afterDiscountTotal: {
      type: String,
      trim: true,
    },
    coupon: {
      type: String,
      trim: true,
    },

    products: [],

    payment_method: {
      type: String,
      required: true,
    },

    shipping_cost: {
      type: String,
      required: true,
    },
    order_notes: {
      type: String,
      required: false,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Completed", "Cancelled"],
    },
    payment_status: {
      type: String,
      default: "Not Verified",
      enum: ["Not Verified", "Verified"],
    },
    delivery_status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Delivered"],
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
