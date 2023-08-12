"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import LoadingSpinner from "@/components/LoadingSpinner";
import classes from "@/styles/MyOrdersPage.module.css";
import commonClasses from "@/styles/Common.module.css";
import buttonClasses from "@/styles/Button.module.css";
import Link from "next/link";

const page = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [myOrders, setMyOrders] = useState({
    isLoading: false,
    error: "",
    orders: [],
  });

  const fetchMyOrders = async () => {
    if (!authCtx?.user) {
      router.replace("/login");
      return;
    }

    setMyOrders((prev) => {
      return {
        ...prev,
        isLoading: true,
        error: "",
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/myorders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      setMyOrders((prev) => {
        return {
          ...prev,
          orders: data.orders,
        };
      });
    } catch (error) {
      console.log(error);
      setMyOrders((prev) => {
        return {
          ...prev,
          error: error.message,
        };
      });
    }

    setMyOrders((prev) => {
      return {
        ...prev,
        isLoading: false,
      };
    });
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className={commonClasses.section}>
      <div className={commonClasses["section-title"]}>Your orders</div>
      {myOrders.isLoading ? (
        <LoadingSpinner />
      ) : myOrders.error ? (
        <div>{error}</div>
      ) : myOrders.orders.length > 0 ? (
        myOrders.orders.map((order) => {
          return (
            <div key={order._id} className={classes["order-wrapper"]}>
              <div className={classes["order-title"]}>
                Order Id : {order._id}
              </div>
              {order?.orderItems.map((item) => {
                return (
                  <OrderItem
                    key={item.product}
                    product={item.product}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <div>No Orders.</div>
      )}
    </div>
  );
};

const OrderItem = ({ product, name, price, quantity, image }) => {
  return (
    <div className={classes["product-wrapper"]}>
      <div className={classes["image-container"]}>
        <img
          src={image}
          alt="product-image"
          className={classes["product-image"]}
        />
      </div>
      <div className={classes["product-details"]}>
        <div>
          <div className={classes["product-name"]}>
            <span>{name.substring(0, 30)}</span>
            {name.length > 40 && <span>...</span>}
          </div>
          <div>
            <span style={{ marginRight: "1.75rem", fontWeight: "500" }}>
              {(price * quantity).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span>qty : {quantity}</span>
          </div>
          <Link href={`/add-review?pid=${product}`} style={{ color: "blue" }}>
            Rate & Review Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
