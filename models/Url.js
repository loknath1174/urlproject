import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    longUrl:{
        type: String,
        required: true
    },
    clicks:{
        type: Number,
        
        default: 0
    }
    },{timestamps:true});
export default mongoose.model("Url",UrlSchema);