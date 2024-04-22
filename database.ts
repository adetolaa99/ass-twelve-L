import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
 try {
    const conn = await mongoose.connect(process.env.DB_URI, {});
    console.log(`MongoDB connected`);
 } catch (error) {
    console.error(error.message);
    process.exit(1);
 }
};

export default connectDB;
