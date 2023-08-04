"use client";

import classes from "@/styles/CategoryItem.module.css";
import Link from "next/link";

const CategoryItem = ({ name, image }) => {
  return (
    <Link
      href={`/categories/${name}?page=1`}
      className={classes["category-container"]}
    >
      <div className={classes["category-title"]}>{name}</div>
      <img src={image} className={classes["category-image"]} />
    </Link>
  );
};

export default CategoryItem;
