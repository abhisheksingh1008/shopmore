import classes from "@/styles/Common.module.css";
import HomePageProductItem from "./HomePageProductItem";

const MostSellingProducts = ({ mostSellingProducts }) => {
  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Most Selling Products</div>
      <div className={classes["section-content"]}>
        <div className={classes["products-list"]}>
          {!mostSellingProducts || mostSellingProducts.length === 0 ? (
            <div>Something went wrong. Failed to load products.</div>
          ) : (
            mostSellingProducts.length > 0 &&
            mostSellingProducts.map((product) => {
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

export default MostSellingProducts;
