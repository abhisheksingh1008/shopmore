"use client";

import Link from "next/link";
import Image from "next/image";
import classes from "@/styles/Home.module.css";
import LandingImage from "@/shared/assets/landing-image.jpg";
import AllCategories from "@/components/AllCategories";
import BestDeals from "@/components/BestDeals";
import TopBrands from "@/components/TopBrands";
import MostSellingProducts from "@/components/MostSellingProducts";
import DiscountBanner from "@/components/DiscountBanner";
import WeeklyPopular from "@/components/WeeklyPopular";

const Home = () => {
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
            <div className={classes["banner-description"]}>
              <p>
                Shopping is a bit of a relaxing hobby for me, which
                <br />
                is sometimes troubling for the bank balance.
              </p>
            </div>
          </div>
          <button className={classes["banner-button"]}>
            <Link href={"/home"}>Learn more</Link>
          </button>
        </div>
      </div>
      <div className={classes.products}>
        <AllCategories />
        <BestDeals />
        <MostSellingProducts />
      </div>
      <DiscountBanner />
      <div className={classes.products}>
        <WeeklyPopular />
      </div>
    </>
  );
};

export default Home;
