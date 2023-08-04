import Product from "../models/productModel.js";
import HttpError from "../models/http-error.js";
import ProductCategory from "../models/productCategoryModel.js";
import products from "../data/products.js";
// import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const getProducts = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    if (!limit) {
      limit = 12;
    }

    const count = await Product.countDocuments();
    const products = await Product.find()
      .skip(page * limit - limit)
      .limit(limit);

    if (!products) {
      return next(new HttpError("Could not get products at the momemt.", 500));
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      count,
      products,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch products.", 500));
  }
};

const getPopularProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(8);

    if (!products) {
      return next(
        new HttpError("Could not get top products at the momemt.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch popular products.", 500));
  }
};

const getBestDealsProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ discount: -1 }).limit(8);

    if (!products) {
      return next(
        new HttpError("Could not get best deals products at the momemt.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch best deals products.", 500));
  }
};

const getMostSellingProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ sold: -1 }).limit(8);

    if (!products) {
      return next(
        new HttpError("Could not get most selling products at the momemt.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Something went wrong, failed to fetch most selling products.",
        500
      )
    );
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const existingProduct = await Product.findById(productId).populate({
      path: "reviews",
      populate: [
        {
          path: "user",
          model: "User",
          select: "name",
        },
      ],
    });

    if (!existingProduct) {
      return next(
        new HttpError("Could not find a product with provided id.", 400)
      );
    }

    // const user = await User.findById(existingProduct.reviews.)

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      product: existingProduct,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, could not find products.", 500)
    );
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const page = req.query.page;

    const count = await Product.countDocuments({ category });
    const products = await Product.find({ category })
      .skip(page * 12 - 12)
      .limit(12);

    if (!products) {
      return next(
        new HttpError("Something went wrong, could not get products.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      count,
      products,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch products.", 500));
  }
};

const getProductsByBrand = async (req, res, next) => {
  try {
    const brand = req.params.brand;
    console.log(brand);

    const count = await Product.countDocuments({ brand });
    const products = await Product.find({ brand });

    if (!products) {
      return next(
        new HttpError("Something went wrong, could not get products.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      count,
      products,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch products.", 500));
  }
};

const generateSignatureForAssetUpload = async (req, res, next) => {
  try {
    const { folder } = req.body;

    if (!folder) {
      return next(
        new HttpError("Folder is required to generate signature.", 400)
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Signature generated!",
      timestamp,
      signature,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, failed to generate signature.", 500)
    );
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      image,
      countInStock,
      discount,
    } = req.body;

    if (!name || name.trim().length === 0) {
      return next(new HttpError("Product name is required.", 400));
    }

    if (!description || description.trim().length === 0) {
      return next(new HttpError("Description is required.", 400));
    }

    if (!category || category.trim().length === 0) {
      return next(new HttpError("Category is required.", 400));
    }

    if (!brand || brand.trim().length === 0) {
      return next(new HttpError("Brand name is required.", 400));
    }

    if (!price || price === 0) {
      return next(new HttpError("Price is required.", 400));
    }

    let productDiscount;

    if (!discount) {
      productDiscount = 0;
    } else {
      productDiscount = discount;
    }

    const newProduct = new Product({
      name,
      description,
      category,
      brand,
      price,
      image,
      countInStock: !countInStock ? 0 : countInStock,
      discount: productDiscount,
      user: req.user._id,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "New product created!",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, creating product failed.", 500)
    );
  }
};

const createManyProducts = async (req, res, next) => {
  try {
    products.forEach((product) => {
      product.user = req.user._id;
    });

    await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: "All products added successfully to the DB.",
      products,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, creating products failed.", 500)
    );
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new HttpError("Product not found.", 400));
    }

    const {
      name,
      description,
      category,
      brand,
      price,
      image,
      countInStock,
      discount,
    } = req.body;

    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.category = category ? category : product.category;
    product.brand = brand ? brand : product.brand;
    product.price = price ? price : product.price;
    product.image = image ? image : product.image;
    product.countInStock = countInStock ? countInStock : product.countInStock;
    product.discount = discount ? discount : product.discount;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated!",
      product,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't update product.", 500)
    );
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new HttpError("Product not found.", 400));
    }

    await Product.deleteOne({ _id: product._id });

    res.status(200).json({
      success: true,
      message: "Product deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("", 500));
  }
};

const createProductReview = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new HttpError("Product not found.", 400));
    }

    const productAlreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (productAlreadyReviewd) {
      return next(new HttpError("Product already reviewd.", 400));
    }

    const { title, rating, comment } = req.body;

    const review = {
      title,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = (
      product.reviews.reduce((res, currReview) => res + currReview.rating, 0) /
      product.reviews.length
    ).toFixed(1);

    await product.save();

    res.status(201).json({
      success: true,
      message: "New review added.",
      product,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, could not add review.", 500)
    );
  }
};

const deleteProductReview = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new HttpError("Product not found.", 400));
    }

    const review = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    product.reviews.pull(review);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong could not delete review.", 500)
    );
  }
};

const getAllDistinctBrands = async (req, res, next) => {
  try {
    const brands = await Product.distinct("brand");

    if (!brands) {
      return next(new HttpError("Failed to get brands.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Brands fetched successfully.",
      brands,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong could not get brands.", 500)
    );
  }
};

const getDistinctBrandsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const brands = await Product.find({ category }).distinct("brand");

    if (!brands) {
      return next(new HttpError("Failed to get brands by category.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Brands fetched successfully.",
      brands,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Something went wrong could not get brands by category.",
        500
      )
    );
  }
};

const getAllProductCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.find();

    if (!categories) {
      return next(
        new HttpError("Could not get categories at the moment.", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Product Categories fetched successfully.",
      categories,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, failed to get categories.", 500)
    );
  }
};

const createProductCategory = async (req, res, next) => {
  try {
    const { name, image } = req.body;

    const existingCategory = await ProductCategory.findOne({ name });

    if (existingCategory) {
      return next(new HttpError("This product category already exists.", 400));
    }

    const newCategory = new ProductCategory({
      name,
      image,
      user: req.user._id,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "New Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, failed to create category.", 500)
    );
  }
};

const deleteProductCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await ProductCategory.findById(categoryId);

    if (!category) {
      return next(
        new HttpError("No category found with the provided id.", 400)
      );
    }

    await ProductCategory.deleteOne({ _id: categoryId });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, failed delete category.", 500)
    );
  }
};

const productFiltersController = async (req, res, next) => {
  try {
    const { category, brands, price } = req.body;
    const page = req.query.page;

    // console.log(brands, price);

    let args = {};
    if (category) {
      args.category = category;
    }
    if (brands?.length !== 0) {
      args.brand = brands;
    }
    if (price?.length !== 0) {
      args.price = { $gte: price[0], $lte: price[1] };
    }

    const count = await Product.countDocuments(args);
    const products = await Product.find(args)
      .skip(page * 12 - 12)
      .limit(12);

    if (!products) {
      return next(
        new HttpError("No products found for the given brand(s).", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      count,
      products,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Something went wrong, failed to get filtered products.",
        500
      )
    );
  }
};

export {
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
};
