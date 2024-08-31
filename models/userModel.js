import mongoose from "mongoose";
import bcrypt from "bcrypt"

import validator from "validator";


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        //zorunlu isim olsun 
        required: [true, "email area is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Only Alphanumeric characters'],
    },
    email: {
        type: String,
        required: [true, "email area is required"],
        //boşluk kurtarma
        unique: true,
        validate: [validator.isEmail, "valid email is req"]
    },
    password: {
        type: String,
        required: [true, "email area is required"],
        minLenght: [4, "at least 4 characters"]
    }
},
    { timestamps: true }
);
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

export default User;