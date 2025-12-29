import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // ✅ Add this to verify credentials are loaded
  console.log("🔍 Cloudinary Configuration:");
  console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING");
  console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ EXISTS" : "❌ MISSING");
  console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ EXISTS" : "❌ MISSING");
};

export default connectCloudinary;