import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn =  await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('mongo db connected successfully')
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.log("connection error db",error)
    }
}

export default connectDB;