"use client";

import { useEffect, useState } from "react";

import classes from "@/styles/Common.module.css";
import LoadingSpinner from "./LoadingSpinner";
import HomePageProductItem from "./HomePageProductItem";

const WeeklyPopular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopularProducts = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/popular`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setPopularProducts(data.products);
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Weekly Popular Products</div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            popularProducts.length > 0 &&
            popularProducts.map((product) => {
              return (
                <HomePageProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              );
            })
          )}
        </div>
        <div>{isError ? `${isError}` : ""}</div>
      </div>
    </section>
  );
};

export default WeeklyPopular;
