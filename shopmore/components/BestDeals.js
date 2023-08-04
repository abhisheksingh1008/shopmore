"use client";

import { useEffect, useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import HomePageProductItem from "@/components/HomePageProductItem";
import classes from "@/styles/Common.module.css";

const BestDeals = () => {
  const [bestDealProducts, setBestDealProducts] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBestDealProducts = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/bestdeals`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setBestDealProducts(data.products);
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBestDealProducts();
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>
        Today's Best Deals For You!
      </div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            bestDealProducts.length > 0 &&
            bestDealProducts.map((product) => {
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

export default BestDeals;
