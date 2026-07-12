import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection failed:");
        console.error(error);

        process.exit(1);
    }
}

export default connectToDB;