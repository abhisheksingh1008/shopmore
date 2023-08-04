import { Router } from "express";

import {
  getUsers,
  login,
  signup,
  userIsAdmin,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/user-controllers.js";
import { requireSignIn, admin } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", requireSignIn, admin, getUsers);
router.post("/login", login);
router.post("/signup", signup);
router.get("/protected", requireSignIn, admin, userIsAdmin);
router.get("/cart", requireSignIn, getUserCart);
router.put("/cart", requireSignIn, addItemToCart);
router.patch("/cart", requireSignIn, removeItemFromCart);
router.delete("/cart", requireSignIn, clearCart);
router.get("/:userId", getUserProfile);
router.patch("/:userId", requireSignIn, updateUserProfile);
router.delete("/:userId", requireSignIn, deleteUser);

export default router;
