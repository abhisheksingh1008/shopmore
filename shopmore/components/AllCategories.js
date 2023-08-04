"use client";

import { useEffect, useState } from "react";

import classes from "@/styles/Common.module.css";
import CategoryItem from "./CategoryItem";
import LoadingSpinner from "./LoadingSpinner";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/categories`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setCategories(data.categories);
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Shop Our Top Categories</div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]} style={{ gap: "1rem" }}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            categories.length > 0 &&
            categories.map((category) => {
              return (
                <CategoryItem
                  key={category.name}
                  name={category.name}
                  image={category.image}
                />
              );
            })
          )}
        </div>
      </div>
      <div>{isError ? `${isError}` : ""}</div>
    </section>
  );
};

export default AllCategories;
