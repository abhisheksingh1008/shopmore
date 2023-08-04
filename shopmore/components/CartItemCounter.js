import classes from "@/styles/CartItemCounter.module.css";

const CartItemCounter = ({ quantity, onCountChange }) => {
  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onClick={() => {
          onCountChange(false);
        }}
      >
        -
      </button>
      <button className={classes["none"]}>{quantity}</button>
      <button
        className={classes.button}
        onClick={() => {
          onCountChange(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default CartItemCounter;
