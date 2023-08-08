import express from "express";
import {
  getOrders,
  getOrderById,
  getMyOrders,
  createOrder,
  createCheckoutSession,
  stripeWebhook,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/order-controllers.js";
import { admin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", requireSignIn, admin, getOrders);
router.post("/", requireSignIn, createOrder);
router.post("/webhook", stripeWebhook);
router.get("/create-checkout-session", requireSignIn, createCheckoutSession);
router.get("/:orderId", requireSignIn, getOrderById);
router.get("/myorders", requireSignIn, getMyOrders);
router.patch("/:orderId/pay", requireSignIn, updateOrderToPaid);
router.patch("/:orderId/deliver", requireSignIn, updateOrderToDelivered);

export default router;
