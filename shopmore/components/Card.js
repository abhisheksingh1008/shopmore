"use client";

import classes from "@/styles/Card.module.css";

const Card = ({ children, className }) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
