const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1); //  exit to avoid running unstable app
  }
};

module.exports = connectDB;