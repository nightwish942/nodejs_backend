import mongoose from "mongoose";



const { Schema } = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        //zorunlu isim olsun 
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        //boşluk kurtarma
        trim: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },

});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;