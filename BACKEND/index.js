import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/books.routes.js";
import reviewRoutes from "./src/routes/review.route.js";
import orderRoutes from "./src/routes/order.routes.js";
import paymentRoutes from "./src/routes/payments.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    methods:['get','post','delete','options'],
    allowedHeaders:['Content-Type','Authorization']
}))

app.use(express.json());

app.use(express.urlencoded({extended:true}))

//cookie-parser
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.get("/", (req,res)=>{
    res.send("hello");
});

//connect to data base
db();

//mapping routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/books",bookRoutes);
app.use("/api/v1/reviews",reviewRoutes);
app.use("/api/v1/orders",orderRoutes);
app.use("/api/v1/payments",paymentRoutes);
app.use("/api/v1/cart", cartRoutes);

//listening on port
app.listen(port,()=>{
    console.log(`app listening on port no ${port}`);
})