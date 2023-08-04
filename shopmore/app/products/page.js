"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import HomePageProductItem from "@/components/HomePageProductItem";
import classes from "@/styles/Products.module.css";
import paginationClasses from "@/styles/Pagination.module.css";
import Filters from "@/components/Filters";

const AllProducts = () => {
  const page = Number(useSearchParams().get("page"));

  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredPrice, setFilteredPrice] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products?page=${page}`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(data.products);
      setTotalPages(Math.ceil(data.count / 12));
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  const fetchProductsByFilters = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/filters?page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brands: selectedBrands,
            price: filteredPrice,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(data.products);
      setTotalPages(Math.ceil(data.count / 12));
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  const fetchAllBrandFilters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/brands`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setBrands(data.brands);
    } catch (error) {
      console.log(error);
    }
  };

  const sortProducts = (value) => {
    let prods = [...products];
    switch (value) {
      case "None":
        setProductsToShow(prods);
        break;
      case "Price Ascending":
        setProductsToShow(prods.sort((a, b) => a.price - b.price));
        break;
      case "Price Descending":
        setProductsToShow(prods.sort((a, b) => b.price - a.price));
        break;
      case "Most Rating":
        setProductsToShow(prods.sort((a, b) => b.rating - a.rating));
        break;
      case "Most Reviews":
        setProductsToShow(prods.sort((a, b) => b.numReviews - a.numReviews));
        break;
      case "4 stars & Up":
        setProductsToShow(prods.filter((prod) => prod.rating > 4));
        break;
      case "3 stars & Up":
        setProductsToShow(prods.filter((prod) => prod.rating > 3));
        break;
      case "2 stars & Up":
        setProductsToShow(prods.filter((prod) => prod.rating > 2));
        break;
      case "1 stars & Up":
        setProductsToShow(prods.filter((prod) => prod.rating > 1));
        break;
      default:
        setProductsToShow(prods);
        break;
    }
  };

  const brandFilterHandler = (brandName, value) => {
    if (value) {
      setSelectedBrands((selectedBrands) => [...selectedBrands, brandName]);
    } else {
      setSelectedBrands((selectedBrands) =>
        selectedBrands.filter((brand) => brand !== brandName)
      );
    }
  };

  const priceFilterHandler = (price) => {
    if (price?.length > 0) {
      setFilteredPrice([...price]);
    } else {
      setFilteredPrice([]);
    }
  };

  useEffect(() => {
    // console.log(selectedBrands);
    if (selectedBrands.length === 0 && filteredPrice.length === 0) {
      fetchProducts();
    } else if (selectedBrands.length > 0 || filteredPrice.length > 0) {
      fetchProductsByFilters();
    }
  }, [page, selectedBrands.length, filteredPrice.length]);

  useEffect(() => {
    setProductsToShow(products);
  }, [products]);

  useEffect(() => {
    fetchAllBrandFilters(products);
  }, []);

  return (
    <>
      <h2 className={classes.title}>All Products</h2>
      <div className={classes.wrapper}>
        <Filters
          brands={brands}
          onFilterChange={sortProducts}
          onBrandFilter={brandFilterHandler}
          onPriceFilter={priceFilterHandler}
          category={""}
        />
        <div className={classes["products-list"]}>
          {isLoading ? (
            <LoadingSpinner />
          ) : productsToShow.length > 0 ? (
            productsToShow.map((product) => {
              return (
                <HomePageProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  countInStock={product.countInStock}
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              );
            })
          ) : (
            <div>No results found.</div>
          )}
        </div>
      </div>
      <div className={paginationClasses["pages-list"]}>
        <Link
          href={`/products?page=${page - 1}`}
          className={
            page === 1 ? paginationClasses.hidden : paginationClasses["page-no"]
          }
        >
          Previous
        </Link>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <Link
              href={`/products?page=${index + 1}`}
              key={index}
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
          href={`/products?page=${page + 1}`}
          className={
            page === totalPages
              ? paginationClasses.hidden
              : paginationClasses["page-no"]
          }
        >
          Next
        </Link>
      </div>
    </>
  );
};

export default AllProducts;
