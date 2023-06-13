const mongoose = require('mongoose');
const crypto = require('crypto');
 
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: false,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        provider: {
            type: String,
            default: "email-password"
        },
        role: {
            type: String,
            default: "customer"
        },
      
    },
    { timestamps: true }
);
 
userSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
 
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};
 
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;