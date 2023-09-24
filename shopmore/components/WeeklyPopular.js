import classes from "@/styles/Common.module.css";
import HomePageProductItem from "./HomePageProductItem";

const WeeklyPopular = ({ popularProducts }) => {
  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Weekly Popular Products</div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]}>
          {!popularProducts || popularProducts.length === 0 ? (
            <div>Something went wrong. Failed to load products.</div>
          ) : (
            popularProducts.length > 0 &&
            popularProducts.map((product) => {
              return (
                <HomePageProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.imageData.image_url}
                  price={product.price}
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default WeeklyPopular;
