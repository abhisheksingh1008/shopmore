"use client";

import { useEffect, useState } from "react";

import classes from "@/styles/Common.module.css";
import LoadingSpinner from "./LoadingSpinner";
import HomePageProductItem from "./HomePageProductItem";

const MostSellingProducts = () => {
  const [mostSellingProducts, setMostSellingProducts] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMostSellingProducts = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/mostselling`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setMostSellingProducts(data.products);
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMostSellingProducts();
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Most Selling Products</div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            mostSellingProducts.length > 0 &&
            mostSellingProducts.map((product) => {
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

export default MostSellingProducts;
