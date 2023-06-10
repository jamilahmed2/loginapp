import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  try {
    const db = await mongoose.connect("mongodb+srv://login-app:login-app12345@cluster0.dvpvdan.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error appropriately
    throw error;
  }
}

export default connect;
