import classes from "@/styles/Common.module.css";
import CategoryItem from "./CategoryItem";

const AllCategories = ({ categories }) => {
  return (
    <section className={classes.section}>
      <div className={classes["section-title"]}>Shop Our Top Categories</div>
      <div className={classes["products-list"]} style={{ gap: "1rem" }}>
        {!categories || categories.length === 0 ? (
          <div>Something went wrong. Failed to load categories.</div>
        ) : (
          categories.length > 0 &&
          categories.map((category) => {
            return (
              <CategoryItem
                key={category.name}
                name={category.name}
                image={category.imageData.image_url}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default AllCategories;
