import { Router } from "express";

import {
  getProducts,
  getPopularProducts,
  getBestDealsProducts,
  getMostSellingProducts,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  createProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getAllDistinctBrands,
  getDistinctBrandsByCategory,
  getAllProductCategories,
  createProductCategory,
  deleteProductCategory,
  productFiltersController,
  generateSignatureForAssetUpload,
} from "../controllers/product-controllers.js";
import { requireSignIn, admin } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", getProducts);
router.get("/popular", getPopularProducts);
router.get("/mostselling", getMostSellingProducts);
router.get("/bestdeals", getBestDealsProducts);
router.get("/categories", getAllProductCategories);
router.get("/categories/:category", getProductsByCategory);
router.get("/brands/:brand", getProductsByBrand);
router.get("/brands", getAllDistinctBrands);
router.get("/categories/:category/brands", getDistinctBrandsByCategory);
router.get("/:pid", getProductById);
router.post("/", requireSignIn, admin, createManyProducts);
router.post(
  "/generateAssetSignature",
  requireSignIn,
  admin,
  generateSignatureForAssetUpload
);
router.post("/filters", productFiltersController);
router.patch("/:pid", requireSignIn, admin, updateProduct);
router.delete("/:pid", requireSignIn, admin, deleteProduct);
router.post("/:pid/reviews", requireSignIn, createProductReview);
router.delete("/:pid/reviews", requireSignIn, deleteProductReview);
router.post("/categories", requireSignIn, admin, createProductCategory);
router.delete(
  "/categories/:categoryId",
  requireSignIn,
  admin,
  deleteProductCategory
);

export default router;
