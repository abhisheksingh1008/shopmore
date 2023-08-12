"use client";

import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import classes from "@/styles/ReviewRating.module.css";

const ReviewRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    onRatingChange(rating);
  }, [rating]);

  return (
    <div style={{ textAlign: "center" }}>
      {[...Array(5)].map((_, index) => {
        return (
          <span
            key={index + 1}
            className={
              index + 1 <= hover
                ? `${classes.star} ${classes.on}`
                : classes.star
            }
            onClick={() => {
              setRating(index + 1);
            }}
            onMouseEnter={() => {
              setHover(index + 1);
            }}
            onMouseLeave={() => {
              setHover(rating);
            }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default ReviewRating;

//   <button key={index + 1} className={classes.button}>
//     <BsStarFill />
//   </button>//   <button key={index + 1} className={classes.button}>
//     <BsStarFill />
//   </button>
