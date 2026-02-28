const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

router.post("/", async (req, res) => {
  try {
    // Accept common payload shapes: { data }, { image }, or raw string body.
    const fileStr =
      req.body?.data ||
      req.body?.image ||
      (typeof req.body === "string" ? req.body : null);

    if (!fileStr) {
      return res.status(400).json({
        error:
          "No image payload found. Send JSON like { data: base64ImageString }",
      });
    }

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "food-delivery",
    });

    res.json({ url: uploadedResponse.secure_url });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

module.exports = router;
