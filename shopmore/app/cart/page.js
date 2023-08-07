"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import classes from "@/styles/CartPage.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import CartItem from "@/components/CartItem";
import toast from "react-hot-toast";

const Cart = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [cart, setCart] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserCart = async () => {
    if (!authCtx?.user) {
      router.replace("/login");
      return;
    }

    setError("");
    setisLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/cart`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      //   console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      setCart(data.cart);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setisLoading(false);
  };

  const itemCountChangeHandler = async (productId, add) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/cart`,
        {
          method: add ? "PUT" : "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const data = await response.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      if (data.success) {
        if (add) {
          toast.success(`Item added to cart!`);
        } else {
          toast.success(`Item removed from cart!`);
        }
      }

      setCart(data.cart);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // setError(error.message);
    }
  };

  const clearCartHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      setCart(data.cart);

      if (data.success) {
        toast.success("Cart cleared!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCheckout = async () => {
    if (!authCtx?.user) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/create-checkout-session`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      } else {
        if (typeof window !== "undefined") {
          window.location.href = data.url;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        cart && (
          <>
            <div className={classes["cart-wrapper"]}>
              <div className={classes.cart}>
                <div className={classes["title-section"]}>
                  <div className={classes.title}>YOUR CART</div>
                  {cart?.cartItems?.length > 0 && (
                    <button
                      onClick={clearCartHandler}
                      className={classes.button}
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
                <div className={classes["items-list"]}>
                  {cart?.cartItems?.length === 0 ? (
                    <div className={classes.empty}>Cart is Empty!</div>
                  ) : (
                    cart?.cartItems?.map((item) => {
                      return (
                        <CartItem
                          key={item.product._id}
                          quantity={item.quantity}
                          product={item.product}
                          totalPrice={item.totalPrice}
                          onChangeItemCount={itemCountChangeHandler}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className={classes["cart-summary-wrapper"]}>
              <div className={classes["cart-summary"]}>
                <div className={`${classes["summary-title"]} ${classes.title}`}>
                  PRICE DETAILS
                </div>
                <div className={classes["details"]}>
                  <div className={classes["price-detail-row"]}>
                    <span>Price({`2`} items)</span>
                    <span>&#x20B9;{cart.totalAmount.toFixed(0)}</span>
                  </div>
                  <div className={classes["price-detail-row"]}>
                    <span>Discount</span>
                    <span>&#x20B9;0</span>
                  </div>
                  <div className={classes["price-detail-row"]}>
                    <span>Delivery Charges</span>
                    <span>Free</span>
                  </div>
                </div>
                <div
                  className={`${classes.total} ${classes["price-detail-row"]}`}
                >
                  <span>Total Amount</span>
                  <span>&#x20B9;{cart.totalAmount}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleCheckout();
                }}
                className={classes.button}
                style={{ width: "100%" }}
              >
                Check out
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Cart;
