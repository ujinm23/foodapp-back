const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_SECRET || process.env.CLOUDINARY_API_SECRET,
});

router.post("/", async (req, res) => {
  try {
    const hasCloudinaryCreds =
      !!cloudinary.config().cloud_name &&
      !!cloudinary.config().api_key &&
      !!cloudinary.config().api_secret;

    if (!hasCloudinaryCreds) {
      return res.status(500).json({
        error:
          "Cloudinary is not configured. Set CLOUD_NAME/CLOUD_KEY/CLOUD_SECRET (or CLOUDINARY_* equivalents).",
      });
    }

    // Accept common payload shapes: { data }, { image }, nested { data: { data } },
    // or any first string value in JSON body.
    let fileStr = null;
    if (typeof req.body === "string") {
      fileStr = req.body;
    } else if (req.body && typeof req.body === "object") {
      fileStr =
        req.body.data ||
        req.body.image ||
        req.body.file ||
        req.body?.data?.data ||
        req.body?.image?.data ||
        null;

      if (!fileStr) {
        fileStr =
          Object.values(req.body).find((value) => typeof value === "string") ||
          null;
      }
    }

    if (!fileStr) {
      return res.status(400).json({
        error:
          'No image payload found. Send JSON like { data: "data:image/png;base64,..." }',
      });
    }

    const uploadOptions = { resource_type: "image" };
    if (process.env.CLOUDINARY_UPLOAD_PRESET) {
      uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    }

    const uploadedResponse = await cloudinary.uploader.upload(
      fileStr,
      uploadOptions
    );

    res.json({ url: uploadedResponse.secure_url });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

module.exports = router;
