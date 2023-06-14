const mongoose = require('mongoose');
 
const otpUserSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            trim: true,
            max: 11
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


 
const OtpUser = mongoose.models.OtpUser || mongoose.model("OtpUser", otpUserSchema);

export default OtpUser;