const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // ✅ Import Multer
const axios = require("axios"); // ✅ Import Axios for sending images to Flask
const cookieParser = require("cookie-parser");
const FormData = require("form-data");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const imageSearchRoutes = require("./routes/shop/image-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Define Multer for Image Uploads
const upload = multer({ storage: multer.memoryStorage() }); // Now it's defined!

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization","Cache-Control"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://pradul:Brook1234@cluster1.xnseu.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));



// ✅ Existing Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop", imageSearchRoutes);

app.use("/api/common/feature", commonFeatureRouter);

// ✅ Start Server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
