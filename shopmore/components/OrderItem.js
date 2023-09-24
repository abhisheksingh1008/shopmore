import classes from "@/styles/OrderDetailPage.module.css";

const OrderItem = ({ name, price, quantity, image }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes["image-area"]}>
        <img
          src={image}
          alt="product-image"
          className={classes["product-image"]}
        />
      </div>
      <div className={classes["item-details"]}>
        <div className={classes["product-name"]}>{name}</div>
        <div className={classes["price"]}>
          <span style={{ marginRight: "0.75rem" }}>
            {(price * quantity).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
          {quantity > 1 && (
            <span style={{ fontWeight: 500 }}>
              {price.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}{" "}
              each
            </span>
          )}
        </div>
        <div>qty : {quantity}</div>
      </div>
    </div>
  );
};

export default OrderItem;
