"use client";

import Link from "next/link";
import classes from "@/styles/AdminDashboard.module.css";

const page = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <div style={{ textAlign: "center" }}>Checkout Successful!</div>
        <div>
          <Link href={"/myorders"} style={{ marginRight: "2rem" }}>
            <button className={classes.button}>Check your orders</button>
          </Link>
          <Link href={"/"}>
            <button className={classes.button}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
