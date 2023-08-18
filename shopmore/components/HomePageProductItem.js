"use client";

import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Rating from "./Rating";
import classes from "@/styles/HomePageProductItem.module.css";
import toast from "react-hot-toast";

const HomePageProductItem = ({
  id,
  name,
  description,
  image,
  price,
  rating,
  numReviews,
}) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const addItemToCartHandler = async () => {
    if (!authCtx?.user) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx?.user?.token}`,
          },
          body: JSON.stringify({
            productId: id,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      } else {
        toast.success("Item added to cart!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={classes["product-container"]}>
      <Link href={`/products/${id}`}>
        <div className={classes["image-area"]}>
          <img
            src={image}
            className={classes["product-image"]}
            alt="product-image"
          />
        </div>
        <div className={classes["product-info"]}>
          <div className={classes["product-top"]}>
            <div className={classes["product-name"]}>
              {name.substring(0, 17)}
              {name.length > 17 && <span>...</span>}
            </div>
            <div className={classes["product-price"]}>
              <span className={classes["text"]}>
                {price.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          </div>
          <div className={classes["product-description"]}>
            {description.substring(0, 75)}...
          </div>
          <div className={classes["product-rating"]}>
            <Rating rating={rating} />
            {`(${numReviews})`}
          </div>
        </div>
      </Link>
      <button onClick={addItemToCartHandler} className={classes.button}>
        Add to Cart
      </button>
    </div>
  );
};

export default HomePageProductItem;
