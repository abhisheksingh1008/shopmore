"use client";

import classes from "@/styles/DiscountBanner.module.css";
import DiscountImage from "@/shared/assets/discount-banner-image.png";
import Image from "next/image";

const DiscountBanner = () => {
  return (
    <section className={classes["discount-banner"]}>
      <div className={classes["banner-content"]}>
        <div>
          <div className={classes["banner-title"]}>Get 5% Cash Back</div>
          <div className={classes["banner-description"]}>on Shopmore.com</div>
          <button className={classes["banner-button"]}>Learn more</button>
        </div>
        <div className={classes["disc-banner-image-container"]}>
          <Image
            src={DiscountImage}
            className={classes["discount-banner-image"]}
            alt={"Discount image"}
          />
        </div>
      </div>
    </section>
  );
};

export default DiscountBanner;
