import mongoose from "mongoose";



const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        //zorunlu isim olsun 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        //boşluk kurtarma
        unique: true,
    },
    password: {
        type: String,
        required:true,
    }
},
{       timestamps:  true  }
);

const User = mongoose.model('User', userSchema);

export default User;