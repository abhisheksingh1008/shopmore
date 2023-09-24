import Image from "next/image";
import classes from "@/styles/Home.module.css";
import LandingImage from "@/shared/assets/landing-image.jpg";
import AllCategories from "@/components/AllCategories";
import BestDeals from "@/components/BestDeals";
// import TopBrands from "@/components/TopBrands";
import MostSellingProducts from "@/components/MostSellingProducts";
import DiscountBanner from "@/components/DiscountBanner";
import WeeklyPopular from "@/components/WeeklyPopular";

// export const revalidate = 300;

const getCategories = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/categories`,
    { next: { revalidate: 120 } }
  )
    .then(async (response) => {
      const data = await response.json();
      // console.log("All Categories : ", data);
      return data.categories;
    })
    .catch((err) => {
      // console.log(err);
    });

  return categories;
};

const getBestDeals = async () => {
  // console.log("Revalidating data");
  const bestDeals = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/bestdeals`,
    { next: { revalidate: 60 } }
  )
    .then(async (response) => {
      const data = await response.json();
      // console.log("BestDeals : ", data);
      return data.products;
    })
    .catch((err) => {
      // console.log(err);
    });

  return bestDeals;
};

const getMostSellingProducts = async () => {
  const mostSelling = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/mostselling`,
    { next: { revalidate: 7200 } }
  )
    .then(async (response) => {
      const data = await response.json();
      // console.log("Most Selling : ", data);
      return data.products;
    })
    .catch((err) => {
      // console.log(err);
    });

  return mostSelling;
};

const getWeeklyPopularProducts = async () => {
  const weeklyPopular = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/popular`,
    { next: { revalidate: 604800 } }
  )
    .then(async (response) => {
      const data = await response.json();
      // console.log("Weelly popular : ", data);
      return data.products;
    })
    .catch((err) => {
      // console.log(err);
    });

  return weeklyPopular;
};

const Home = async () => {
  const categories = await getCategories();
  const bestDeals = await getBestDeals();
  const mostSelling = await getMostSellingProducts();
  const weeklyPopular = await getWeeklyPopularProducts();

  return (
    <>
      <div className={classes.hero}>
        <Image
          src={LandingImage}
          className={classes["hero-image"]}
          alt="hero"
        />
        <div className={classes["banner-wrapper"]}>
          <div className={classes["banner-content"]}>
            <div className={classes["banner-title"]}>Shopping And</div>
            <div className={classes["banner-title"]}>Department Store.</div>
          </div>
          <button className={classes["banner-button"]}>Learn more</button>
        </div>
      </div>
      <div className={classes.products}>
        <AllCategories categories={categories} />
        <BestDeals bestDealProducts={bestDeals} />
        <MostSellingProducts mostSellingProducts={mostSelling} />
      </div>
      <DiscountBanner />
      <div className={classes.products}>
        <WeeklyPopular popularProducts={weeklyPopular} />
      </div>
    </>
  );
};

export default Home;
