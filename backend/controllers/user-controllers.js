import User from "../models/userModel.js";
import HttpError from "../models/http-error.js";
import {
  generateToken,
  createHashedPassword,
  comparePassword,
} from "../utils/authHelpers.js";
import Product from "../models/productModel.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const userData = users.map((user) => {
      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      users: userData,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong.", 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim().length === 0) {
      return next(new HttpError("Email is required.", 400));
    }

    if (!password || password.trim().length === 0) {
      return next(new HttpError("Password is required.", 400));
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(
        new HttpError(
          "Cannot find a user with the provided email id. Please provide valid credentials or try signing up instead.",
          400
        )
      );
    }

    if (!(await comparePassword(password, existingUser.password))) {
      return next(new HttpError("Incorrect email or password.", 400));
    }

    const token = generateToken(existingUser._id, existingUser.email);

    res.status(200).json({
      success: true,
      message: "Logged in.",
      user: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        cart: existingUser.cart,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Unable to login. Please try again later.", 400));
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim().length === 0) {
      return next(new HttpError("Name is required.", 400));
    }

    if (!email || email.trim().length === 0) {
      return next(new HttpError("Email is required.", 400));
    }

    if (!password || password.trim().length === 0) {
      return next(new HttpError("Password is required.", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        new HttpError("A user already exists with provided email id.", 400)
      );
    }

    const hashedPassword = await createHashedPassword(password);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = generateToken(createdUser._id, email);

    res.status(201).json({
      success: true,
      message: "User created.",
      user: {
        userId: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        cart: createdUser.cart,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Unable to signup. Please try again later", 500));
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(
        new HttpError("Cannot find a user with provided user id.", 500)
      );
    }

    res.status(200).json({
      success: true,
      message: "User fetched.",
      user: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        cart: existingUser.cart,
      },
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Could not get user at the moment please try again later.",
        500
      )
    );
  }
};

const userIsAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    res.status(200).json({
      success: true,
      result: true,
    });
  } else {
    res.status(200).json({
      success: true,
      result: false,
    });
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const { oldPassword, newPassword } = req.body;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(
        new HttpError("Cannot find a user with provided user id.", 500)
      );
    }

    if (!(existingUser._id.toString() === req.user._id.toString())) {
      return next(
        new HttpError("Only the owner of a account can update it.", 400)
      );
    }

    if (!(await comparePassword(oldPassword, existingUser.password))) {
      return next(new HttpError("Wrong password.", 400));
    }

    const hashedPassword = await createHashedPassword(newPassword);

    existingUser.password = hashedPassword || existingUser.password;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "User updated!",
      user: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        cart: existingUser.cart,
      },
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not update user, please try again later.", 500)
    );
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(
        new HttpError("Cannot find a user with provided user id.", 500)
      );
    }

    if (!(existingUser._id.toString() === req.user._id.toString())) {
      return next(
        new HttpError("Only the owner of a account can delete it.", 400)
      );
    }

    await User.deleteOne({ _id: existingUser._id });

    res.status(200).json({
      success: true,
      message: "User deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Couldn't delete user.", 500));
  }
};

const getUserCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "cartItems",
        populate: [
          {
            path: "product",
            model: "Product",
            select: "name imageData brand price discount countInStock",
          },
        ],
      },
    });

    if (!user) {
      return next(new HttpError("Error while fetching cart.", 400));
    }

    res.json({
      success: true,
      message: "Cart fetched successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to load cart.", 500));
  }
};

const addItemToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return next(new HttpError("Please provide a valid product id.", 400));
    }

    let existingUser = req.user;

    const existingItem = existingUser.cart.cartItems.find(
      (item) => item.product.toString() === existingProduct._id.toString()
    );

    if (existingProduct?.countInStock <= existingItem?.quantity) {
      return next(
        new HttpError(
          "Not enough items in stock, failed to add item to cart.",
          400
        )
      );
    }

    if (existingItem) {
      existingUser.cart.cartItems.forEach((item) => {
        if (item.product.toString() === existingProduct._id.toString()) {
          item.quantity++;
          item.totalPrice = item.quantity * existingProduct.price;
        }
      });
    } else {
      const newItem = {
        product: existingProduct._id,
        totalPrice: existingProduct.price,
        quantity: 1,
      };
      existingUser.cart.cartItems.push(newItem);
    }

    existingUser.cart.totalAmount += existingProduct.price;

    await existingUser.save();

    existingUser = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "cartItems",
        populate: [
          {
            path: "product",
            model: "Product",
            select: "name imageData brand price discount countInStock",
          },
        ],
      },
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart.",
      cart: existingUser.cart,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to add item to cart.", 500));
  }
};

const removeItemFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return next(new HttpError("Please provide a valid product id.", 500));
    }

    let existingUser = req.user;

    const existingItem = existingUser.cart.cartItems.find(
      (item) => item.product.toString() === existingProduct._id.toString()
    );

    if (existingItem) {
      existingUser.cart.cartItems.forEach((item) => {
        if (item.product.toString() === existingProduct._id.toString()) {
          if (item.quantity === 1) {
            existingUser.cart.cartItems.pull({
              product: existingProduct._id,
            });
          } else if (item.quantity > 1) {
            item.quantity--;
            item.totalPrice -= existingProduct.price;
          }
          existingUser.cart.totalAmount -= existingProduct.price;
        }
      });
    } else {
      return next(
        new HttpError(
          "Item does not exists in the cart, cannot remove it.",
          400
        )
      );
    }

    await existingUser.save();

    existingUser = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "cartItems",
        populate: [
          {
            path: "product",
            model: "Product",
            select: "name imageData brand price discount countInStock",
          },
        ],
      },
    });

    res.status(201).json({
      success: true,
      message: "Product removed from cart.",
      cart: existingUser.cart,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to add item to cart.", 500));
  }
};

const clearCart = async (req, res, next) => {
  try {
    const existingUser = req.user;

    existingUser.cart.cartItems = [];
    existingUser.cart.totalAmount = 0;

    await existingUser.save();

    res.status(201).json({
      success: true,
      message: "Cart cleared!",
      cart: existingUser.cart,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to clear cart.", 500));
  }
};

export {
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
};
