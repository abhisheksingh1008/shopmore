import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import HttpError from "../models/http-error.js";
import Stripe from "stripe";

const getOrders = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const count = await Order.countDocuments();
    const orders = await Order.find({})
      .skip(page * limit)
      .limit(limit);

    if (!orders) {
      return next(new HttpError("Orders not found.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      count,
      orders,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't load orders.", 500)
    );
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId)
      .skip(page * limit)
      .limit(limit);

    if (!order) {
      return next(new HttpError("Orders not found.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't find order.", 500)
    );
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
      return next(new HttpError("Orders not found.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't update product.", 500)
    );
  }
};

const createCheckoutSession = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "cartItems",
        populate: [
          {
            path: "product",
            model: "Product",
            select: "name image brand price discount countInStock",
          },
        ],
      },
    });

    const orderItems = existingUser.cart.cartItems.map((item) => {
      return {
        product: item.product._id,
        name: item.product.name,
        image: item.product.image,
        quantity: item.quantity,
      };
    });

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user._id,
        // orderItems: JSON.stringify(orderItems),
      },
    });

    const line_items = existingUser.cart.cartItems.map((item) => {
      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item.product.name,
            images: [item.product.image],
            description: item.product.description,
            metadata: {
              id: item.product._id,
            },
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "INR",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 10000,
              currency: "INR",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(201).json({
      success: true,
      message: "Checkout session created successfully!",
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Something went wrong, failed to create payment session.",
        500
      )
    );
  }
};

const stripeWebhook = async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  let event, eventType, data;

  try {
    const signature = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
    );

    eventType = event.type;
    data = event.data.object;
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    console.log(`Unhandled event type ${event.type}`);
    return;
  }

  if (eventType === "checkout.session.completed") {
    await stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log("Customer is : ", customer);
        console.log("Data is : ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.json({});
};

const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    const totalPrice = orderItems.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);

    let shippingPrice = 0;

    if (totalPrice < 500) {
      shippingPrice = 40;
      totalPrice += shippingPrice;
    }

    const taxPrice = 0;

    const createdOrder = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    await createOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: createdOrder,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't update product.", 500)
    );
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const orderId = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new HttpError("Orders not found.", 400));
    }

    order.isPaid = true;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order",
      order,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't update product.", 500)
    );
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const orderId = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new HttpError("Orders not found.", 400));
    }

    order.isDelivered = true;

    await order.save();
    res.status(200).json({
      success: true,
      message: "Order",
      order,
    });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, couldn't update product.", 500)
    );
  }
};

export {
  getOrders,
  getOrderById,
  getMyOrders,
  createOrder,
  createCheckoutSession,
  stripeWebhook,
  updateOrderToPaid,
  updateOrderToDelivered,
};
