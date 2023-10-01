"use client";

import classes from "@/styles/CartItem.module.css";
import Link from "next/link";
import CartItemCounter from "./CartItemCounter";

const CartItem = ({ product, quantity, totalPrice, onChangeItemCount }) => {
  const { _id, name, imageData, price, brand, discount, countInStock } =
    product;

  const countChangeHandler = (add) => {
    onChangeItemCount(_id, add);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes["item-details"]}>
        <Link href={`/products/${_id}`}>
          <div className={classes["image-container"]}>
            <img
              src={imageData.image_url}
              alt={`${name} image`}
              className={classes["product-image"]}
            />
          </div>
        </Link>
        <div className={classes["item-info"]}>
          <Link href={`/products/${_id}`}>
            <div className={classes["product-name"]}>
              {name.substring(0, 45)}
              {name.length > 45 && "..."}
            </div>
            <div className={classes.brand}>{brand}</div>
          </Link>
          {countInStock === 0 ? (
            <div className={classes["out-of-stock"]}>Out Of Stock</div>
          ) : countInStock < 100 ? (
            <div className={classes["stock-left"]}>
              Hurry only {countInStock} left!
            </div>
          ) : (
            ""
          )}
          {countInStock > 0 && (
            <div className={classes["price-section"]}>
              <span className={classes.price}>
                {totalPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              {discount > 0 && (
                <span className={classes.discount}>{discount}% Off.</span>
              )}
            </div>
          )}
        </div>
      </div>
      {countInStock > 0 && (
        <CartItemCounter
          quantity={quantity}
          onCountChange={countChangeHandler}
        />
      )}
    </div>
  );
};

export default CartItem;
