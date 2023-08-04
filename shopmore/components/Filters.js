"use client";

import { useRef } from "react";

import { useRouter } from "next/navigation";
import filterClasses from "@/styles/Filters.module.css";
import { BsStar, BsStarFill } from "react-icons/bs";

const Filters = ({
  brands,
  onFilterChange,
  onBrandFilter,
  onPriceFilter,
  category,
}) => {
  const router = useRouter();

  const minPriceRef = useRef();
  const maxPriceRef = useRef();

  return (
    <div className={filterClasses.filters}>
      <h3>Filters</h3>
      <div>
        <div className={filterClasses.filter}>
          <div htmlFor="sort-by" className={filterClasses["filter-title"]}>
            Sort By :
          </div>
          <select
            id="sort-by"
            className={filterClasses.sort}
            onChange={(e) => {
              onFilterChange(e.target.value);
            }}
          >
            <option value="None">None</option>
            <option value="Price Ascending">Price Ascending</option>
            <option value="Price Descending">Price Descending</option>
            <option value="Most Rating">Most Rating</option>
            <option value="Most Reviews">Most Reviews</option>
          </select>
        </div>
        <div className={filterClasses.filter}>
          <div className={filterClasses["filter-title"]}>
            Customer Reviews :
          </div>
          <button
            type="submit"
            className={filterClasses["clear-btn"]}
            onClick={() => {
              onFilterChange("None");
            }}
          >
            Clear
          </button>
          <div>
            <button
              type="button"
              onClick={() => {
                onFilterChange("4 stars & Up");
              }}
            >
              <FourStars /> & Up
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange("3 stars & Up");
              }}
            >
              <ThreeStars /> & Up
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange("2 stars & Up");
              }}
            >
              <TwoStars /> & Up
            </button>
            <button
              type="button"
              onClick={() => {
                onFilterChange("1 stars & Up");
              }}
            >
              <OneStar /> & Up
            </button>
          </div>
        </div>
        <div className={filterClasses.filter}>
          <div className={filterClasses["filter-title"]}>Featured Brands :</div>
          {brands.map((brand) => {
            return (
              <div className={filterClasses["brand"]} key={brand}>
                <input
                  type="checkbox"
                  name={brand}
                  onChange={(e) => {
                    category
                      ? router.replace(`/categories/${category}?page=1`)
                      : router.replace("/products?page=1");
                    onBrandFilter(e.target.name, e.target.checked);
                  }}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPriceFilter([
              minPriceRef.current.value,
              maxPriceRef.current.value,
            ]);
          }}
          className={filterClasses.filter}
        >
          <div className={filterClasses["filter-title"]}>Price :</div>
          <div>
            <span>
              <input
                type="number"
                placeholder="min"
                ref={minPriceRef}
                required
                min={1}
                className={filterClasses["price-range-input"]}
              />
            </span>
            <span>
              <input
                type="number"
                placeholder="max"
                ref={maxPriceRef}
                required
                min={1}
                className={filterClasses["price-range-input"]}
              />
            </span>
          </div>
          <button type="submit">Go</button>
          <button
            type="none"
            onClick={() => {
              onPriceFilter([]);
              minPriceRef.current.value = "";
              maxPriceRef.current.value = "";
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

const FourStars = () => {
  return (
    <>
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
    </>
  );
};

const ThreeStars = () => {
  return (
    <>
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
    </>
  );
};

const TwoStars = () => {
  return (
    <>
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
    </>
  );
};

const OneStar = () => {
  return (
    <>
      <BsStarFill className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
      <BsStar className={filterClasses["star-icon"]} />
    </>
  );
};

export default Filters;
