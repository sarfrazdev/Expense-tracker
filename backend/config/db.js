import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
          console.log("Db connected successfully")
        }
        catch(err){
            console.log("Error in connecting to db", err)
        }
   
}
export default connectDB;