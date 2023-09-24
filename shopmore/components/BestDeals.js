import HomePageProductItem from "@/components/HomePageProductItem";
import classes from "@/styles/Common.module.css";

const BestDeals = ({ bestDealProducts }) => {
  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>
        Today's Best Deals For You!
      </div>
      <div className={classes["products-list"]}>
        {!bestDealProducts || bestDealProducts.length === 0 ? (
          <div>Something went wrong. Failed to load products.</div>
        ) : (
          bestDealProducts.length > 0 &&
          bestDealProducts.map((product) => {
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
    </section>
  );
};

export default BestDeals;
