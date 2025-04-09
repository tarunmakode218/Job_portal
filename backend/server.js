// import app from "./app.js";
// import cloudinary from "cloudinary";
// import path from "path";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const __dirname = path.resolve();

// if(process.env.NODE_ENV==="production"){
//   app.use(XPathExpression.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//   })
// }
// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });
import express from "express";
import app from "./app.js";
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set Base URL based on environment
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "/api";

console.log("Base URL is:", BASE_URL);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
