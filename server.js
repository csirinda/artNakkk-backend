import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js"; 
import userRouter from "./routes/userRouter.js"; 
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: 'https://admin-fullstack-kohl.vercel.app/',
  credentials: true,
};
app.use(cors(corsOptions));
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());

const allowedOrigins = [
    "https://artnakkk-frontend-admin.vercel.app",
    "http://localhost:5175", // For local development
    "http://localhost:5176",
    "http://localhost:5173" // For local development
  ];
  
  // Configure CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error("Not allowed by CORS")); // Block the origin
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies or Authorization headers
    })
  );

//app endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req,res) => {
    res.send("API Working");
});

app.listen(port, () => 
console.log("Server run on PORT : " + port));