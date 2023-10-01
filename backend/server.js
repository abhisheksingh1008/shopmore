import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectToDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";

dotenv.config();
connectToDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res, next) => {
  res.send("Shopmore backend API is running successfully...");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
