"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import classes from "@/styles/ProductsListingPage.module.css";
import paginationClasses from "@/styles/Pagination.module.css";
import HomePageProductItem from "@/components/HomePageProductItem";

const page = () => {
  const find = useSearchParams().get("find");
  const page = Number(useSearchParams().get("page"));

  const [searchResultProducts, setSearchResultProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    setError("");
    setLoadingProducts(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/search?find=${find}&page=${page}`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setSearchResultProducts(data.products);
      setTotalPages(Math.ceil(data.count / 12));
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, find]);

  return (
    <div>
      <div className={classes.top}>
        <h3 className={classes.title}>Showing results for "{find}"</h3>
      </div>
      <div className={classes["products-list-a"]}>
        {loadingProducts ? (
          <LoadingSpinner />
        ) : error ? (
          <div>{error}</div>
        ) : searchResultProducts.length > 0 ? (
          searchResultProducts.map((product) => {
            return (
              <HomePageProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                image={product.imageData.image_url}
                price={product.price}
                countInStock={product.countInStock}
                rating={product.rating}
                numReviews={product.numReviews}
              />
            );
          })
        ) : (
          <div>No results found for {find}.</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className={paginationClasses["pages-list"]}>
          <Link
            href={`/search?find=${find}&page=${page - 1}`}
            className={
              page === 1
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &lt;
          </Link>
          {[...Array(totalPages)].map((_, index) => {
            return (
              <Link
                key={index}
                href={`/search?find=${find}&page=${index + 1}`}
                className={
                  page === index + 1
                    ? `${paginationClasses["page-no"]} ${paginationClasses.active}`
                    : paginationClasses["page-no"]
                }
              >
                {index + 1}
              </Link>
            );
          })}
          <Link
            href={`/search?find=${find}&page=${page + 1}`}
            className={
              page === totalPages
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &gt;
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
