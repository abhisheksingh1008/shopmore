"use client";

import classes from "@/styles/ListingPageProductItem.module.css";
import Link from "next/link";
import Rating from "./Rating";

const ListingPageProductItem = ({
  id,
  name,
  description,
  image,
  price,
  countInStock,
  rating,
  numReviews,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className={classes.wrapper}>
        <div className={classes["image-container"]}>
          <img
            src={image}
            alt={`${name} image`}
            className={classes["product-image"]}
          />
        </div>
        <div className={classes["product-info"]}>
          <div className={classes["product-name"]}>{name}</div>
          <div className={classes["product-description"]}>
            {description.substring(0, 120)}
            {description.length > 75 && <span>...</span>}
          </div>
          <div className={classes["product-rating"]}>
            <Rating rating={rating} />
            {`(${numReviews})`}
          </div>
          {countInStock > 0 ? (
            <div className={classes.price}>
              {price.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}
            </div>
          ) : (
            <div className={classes["out-of-stock"]}>Out Of Stock</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingPageProductItem;
