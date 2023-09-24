"use client";

import { useContext, useState, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import toast from "react-hot-toast";
import paginationClasses from "@/styles/Pagination.module.css";

const columns = [
  "Order Id",
  "Customer Email",
  "Payment status",
  "Amount paid",
  "Delivery status",
  "Edit",
];

const OrdersTable = () => {
  const authCtx = useContext(AuthContext);

  const page = Number(useSearchParams().get("page"));
  const LIMIT = Number(useSearchParams().get("limit"));

  const [ordersData, setOrdersData] = useState({
    orders: [],
    totalPages: 0,
    isLoading: false,
    error: "",
  });

  const fetchOrders = async () => {
    setOrdersData((prev) => {
      return {
        ...prev,
        error: "",
        isLoading: true,
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders?page=${page}&limit=${LIMIT}`,
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

      // console.log(data);

      setOrdersData((prev) => {
        return {
          ...prev,
          orders: data.orders,
          totalPages: Math.ceil(data.count / LIMIT),
        };
      });
    } catch (error) {
      console.log(error.message);
      setOrdersData((prev) => {
        return {
          ...prev,
          error: error.message,
        };
      });
    }

    setOrdersData((prev) => {
      return {
        ...prev,
        isLoading: false,
      };
    });
  };

  const updateOrderAsDelivered = async (orderId) => {
    // console.log("Order marked as delivered");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/${orderId}/deliver`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      const updatedOrders = [...ordersData.orders];
      const orderIndex = updatedOrders.findIndex(
        (order) => order._id === orderId
      );

      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        isDelivered: true,
      };

      setOrdersData((prev) => {
        return {
          ...prev,
          orders: updatedOrders,
        };
      });

      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Error while updating order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  return (
    <div className="w3-responsive">
      {ordersData.isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="w3-table-all">
          <thead>
            <tr className="w3-green">
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersData.error ? (
              <td colSpan={6}>{ordersData.error}</td>
            ) : (
              ordersData.orders.length > 0 &&
              ordersData.orders.map((order) => {
                return (
                  <tr key={order._id} className="w3-hover-green">
                    <td>
                      <Link href={`/dashboard/orders/${order._id}`}>
                        {order._id}
                      </Link>
                    </td>
                    <td>{order?.shippingDetails?.email}</td>
                    <td>{order?.paymentResult?.payment_status}</td>
                    <td>
                      {order.totalPrice.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                    {order.isDelivered ? (
                      <td>{""}</td>
                    ) : (
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          updateOrderAsDelivered(order._id);
                        }}
                      >
                        Mark Delivered
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
      {ordersData.totalPages > 1 && (
        <div className={paginationClasses["pages-list"]}>
          {page - 10 > 1 && (
            <Link
              href={`/dashboard/orders?page=${page - 10}&limit=${LIMIT}`}
              className={paginationClasses["page-no"]}
            >
              &lt;&lt;
            </Link>
          )}
          {page !== 1 && (
            <Link
              href={`/dashboard/orders?page=${page - 1}&limit=${LIMIT}`}
              className={paginationClasses["page-no"]}
            >
              &lt;
            </Link>
          )}
          {[...Array(ordersData.totalPages)].map((_, index) => {
            return (
              <Link
                key={index + 1}
                href={`/dashboard/orders?page=${index + 1}&limit=${LIMIT}`}
                className={
                  page === index + 1
                    ? `${paginationClasses["page-no"]} ${paginationClasses.active}`
                    : paginationClasses["page-no"]
                }
              >
                {index + 1}
              </Link>
            );
          })}
          {page !== ordersData.totalPages && (
            <Link
              href={`/dashboard/orders?page=${page + 1}&limit=${LIMIT}`}
              className={paginationClasses["page-no"]}
            >
              &gt;
            </Link>
          )}
          {page + 10 < ordersData.totalPages && (
            <Link
              href={`/dashboard/orders?page=${page + 10}&limit=${LIMIT}`}
              className={paginationClasses["page-no"]}
            >
              &gt;&gt;
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
