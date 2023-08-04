import { BsStarFill } from "react-icons/bs";
import classes from "@/styles/ProductReview.module.css";

const ProductReview = ({ rating, title, comment, userName }) => {
  return (
    <div className={classes.review}>
      <div className={classes["review-title-section"]}>
        <span className={classes["product-rating"]}>
          <span>{rating} </span>
          <span>
            <BsStarFill className={classes["star-icon"]} />
          </span>
        </span>
        <span className={classes["review-title"]}>{title}</span>
      </div>
      <div className={classes["reviewed-by"]}>Reviewed by {userName}</div>
      <div className={classes["review-comment"]}>{comment}</div>
    </div>
  );
};

export default ProductReview;
