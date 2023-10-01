"use client";

import { useState, useEffect, useContext } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import classes from "@/styles/OrderDetailPage.module.css";
import commonClasses from "@/styles/Common.module.css";
import AuthContext from "@/store/auth-context";
import OrderItem from "@/components/OrderItem";

const page = ({ params }) => {
  const orderId = params.orderId;

  const authCtx = useContext(AuthContext);

  const [orderData, setOrderData] = useState({
    isLoading: false,
    error: "",
    order: null,
  });

  const fetchOrderById = async () => {
    setOrderData((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      //   console.log(data);

      setOrderData((prev) => {
        return {
          ...prev,
          order: data.order,
        };
      });
    } catch (error) {
      console.log(error.message);
      setOrderData((prev) => {
        return {
          ...prev,
          error: error.message,
        };
      });
    }

    setOrderData((prev) => {
      return {
        ...prev,
        isLoading: false,
      };
    });
  };

  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <div className={commonClasses.section}>
      <div className={commonClasses["section-title"]}>
        Order : {params.orderId}
      </div>
      {orderData.isLoading ? (
        <LoadingSpinner />
      ) : orderData.error ? (
        <div>{orderData.error}</div>
      ) : (
        orderData.order && (
          <div>
            <div className={`${classes["detail-section"]} ${classes.title}`}>
              Cutomer Id : {orderData.order?.user}
            </div>
            <div className={`${classes["detail-section"]} ${classes.title}`}>
              Delivery Status :{" "}
              {orderData.order?.isDelivered ? "Delivered" : "Not Delivered"}
            </div>
            <div className={classes["detail-section"]}>
              <div className={classes.title}>Shipping Details :</div>
              <div>Name : {orderData.order.shippingDetails.name}</div>
              <div>Email : {orderData.order.shippingDetails.email}</div>
              <div>Phone : {orderData.order.shippingDetails.phone}</div>
              <div>
                Address line 1 : {orderData.order.shippingDetails.address_line1}
              </div>
              {orderData.order.shippingDetails.address_line2 && (
                <div>
                  Address line 2 :{" "}
                  {orderData.order.shippingDetails.address_line2}
                </div>
              )}
              <div>
                Postal Code : {orderData.order.shippingDetails.postalCode}
              </div>
              <div>City : {orderData.order.shippingDetails.city}</div>
              <div>State : {orderData.order.shippingDetails.state}</div>
              <div>Country : {orderData.order.shippingDetails.country}</div>
            </div>
            <div className={classes["detail-section"]}>
              <div className={classes.title}>Payment Details :</div>
              <div>
                Payment status : {orderData.order.paymentResult.payment_status}
              </div>
              <div>
                Payment method : {orderData.order.paymentResult.payment_method}
              </div>
              <div>
                Amount Paid :{" "}
                {orderData.order.totalPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div>
                Payment intent :{" "}
                {orderData.order.paymentResult?.payment_intent_id}
              </div>
              <div>
                Email address : {orderData.order.paymentResult.email_address}
              </div>
            </div>
            <div className={classes["detail-section"]}>
              <div className={classes.title}>Ordered Items :</div>
              <div>
                {orderData.order.orderItems &&
                  orderData.order.orderItems.map((item) => (
                    <OrderItem
                      key={item.product}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default page;
