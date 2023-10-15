import mongoose from "mongoose";

export const connectDB = ()=>{
    const url = process.env.MONGO_URL;
   mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>{
        console.log('Mongodb connected')
    })
    .catch((err)=>{
        console.log(err)
    });
}