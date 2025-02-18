const axios = require("axios");
const FormData = require("form-data");

const imageSearch = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    console.log("Sending Image to FastAPI...");

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const fastapiResponse = await axios.post("http://127.0.0.1:5050/api/shop/image-search", formData, {
      headers: formData.getHeaders(),
    });

    console.log("🔍 FastAPI Response:", fastapiResponse.data);

    res.status(200).json({
      success: true,
      data: fastapiResponse.data,
    });

  } catch (error) {
    console.error("Express Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { imageSearch };
