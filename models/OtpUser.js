import { truncate } from 'fs/promises';

const mongoose = require('mongoose');
 
const Schema = new mongoose.Schema(
    {
        phone: {
            type: String,
            trim: true,
            required: truncate,
            max: 32
        },
        provider: {
            type: String,
            default: "otp"
        },

        role: {
            type: String,
            default: "customer"
        },
      
    },
    { timestamps: true }
);


 
const OtpUser = mongoose.models.OtpUser || mongoose.model("OtpUser", Schema);

export default OtpUser;