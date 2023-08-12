import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import classes from "@/styles/Rating.module.css";

const Star = ({ fill }) => {
  return (
    <span>
      {fill === 1 ? (
        <BsStarFill className={classes.icon} />
      ) : fill > 0 && fill < 1 ? (
        <BsStarHalf className={classes.icon} />
      ) : (
        <BsStar className={classes.icon} />
      )}
    </span>
  );
};

export default Star;
