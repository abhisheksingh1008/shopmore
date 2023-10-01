"use client";

import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import paginationClasses from "@/styles/Pagination.module.css";
import classes from "@/styles/AdminDashboard.module.css";
import toast from "react-hot-toast";

const LIMIT = 15;
const columns = [
  "Name",
  "Category",
  "Price",
  "In Stock",
  "Discount",
  "Edit",
  "Delete",
];

const ProductsTable = () => {
  const authCtx = useContext(AuthContext);

  const [productsData, setProductsData] = useState({
    products: [],
    totalPages: 0,
    isLoading: false,
    error: "",
  });

  const page = Number(useSearchParams().get("page"));

  const [productToDelete, setProductToDelete] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const modalRef = useRef(null);

  const fetchProducts = async () => {
    setProductsData((prev) => {
      return {
        ...prev,
        error: "",
        isLoading: true,
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products?page=${page}&limit=${LIMIT}`,
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

      setProductsData((prev) => {
        return {
          ...prev,
          products: data.products,
          totalPages: Math.ceil(data.count / LIMIT),
        };
      });
    } catch (error) {
      console.log(error.message);
      setProductsData((prev) => {
        return {
          ...prev,
          error: error.message,
        };
      });
    }

    setProductsData((prev) => {
      return {
        ...prev,
        isLoading: false,
      };
    });
  };

  const deleteProductHandler = async (productId) => {
    setDeletingProduct(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authCtx?.user?.token}`,
          },
        }
      );

      const data = await response.json();

      setDeletingProduct(false);

      if (!data.success) {
        throw new Error(data.message);
      } else {
        toast.success("Product deleted successfully!");
      }

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className={`w3-responsive ${classes.wrapper}`}>
      <dialog className={classes.modal} ref={modalRef}>
        <div className={classes["modal-content"]}>
          <div>Are you sure you want to delete this product?</div>
          <div className={classes["modal-actions"]}>
            <button
              className={classes.button}
              style={{ marginRight: "0.5rem" }}
              onClick={async () => {
                if (productToDelete) {
                  await deleteProductHandler(productToDelete);
                }
                setProductToDelete(null);
                modalRef.current.close();
              }}
            >
              {deletingProduct ? "Deleting..." : "Confirm"}
            </button>
            <button
              className={classes.button}
              onClick={() => {
                setProductToDelete(null);
                modalRef.current.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      {productsData.isLoading ? (
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
            {productsData.error ? (
              <td colSpan={7}>{productsData.error}</td>
            ) : (
              productsData.products.length > 0 &&
              productsData.products.map((product) => {
                return (
                  <tr key={product._id} className="w3-hover-green">
                    <td>
                      <Link href={`/products/${product._id}`}>
                        {product.name.substring(0, 75)}
                        {product.name.length > 75 && "..."}
                      </Link>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      {product.price.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>{product.countInStock}</td>
                    <td>{product.discount}</td>
                    <td>
                      <Link href={`/dashboard/edit-product/${product._id}`}>
                        <TbEdit />
                      </Link>
                    </td>
                    <td style={{ cursor: "pointer" }}>
                      <MdDelete
                        onClick={() => {
                          setProductToDelete(product._id);
                          modalRef.current.showModal();
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
      {productsData.totalPages !== 0 && productsData.products.length > 0 && (
        <div className={paginationClasses["pages-list"]}>
          <Link
            href={`/dashboard/admin-products?page=${page - 10}&limit=${LIMIT}`}
            className={
              page - 10 < 1
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &lt;&lt;
          </Link>
          <Link
            href={`/dashboard/admin-products?page=${page - 1}&limit=${LIMIT}`}
            className={
              page === 1
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &lt;
          </Link>
          {[...Array(Math.ceil(productsData.totalPages))].map((_, index) => {
            return (
              <Link
                key={index + 1}
                href={`/dashboard/admin-products?page=${
                  index + 1
                }&limit=${LIMIT}`}
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
          <Link
            href={`/dashboard/admin-products?page=${page + 1}&limit=${LIMIT}`}
            className={
              page === productsData.totalPages
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &gt;
          </Link>
          <Link
            href={`/dashboard/admin-products?page=${page + 10}&limit=${LIMIT}`}
            className={
              page + 10 > productsData.totalPages
                ? paginationClasses.hidden
                : paginationClasses["page-no"]
            }
          >
            &gt;&gt;
          </Link>
        </div>
      )}
    </div>
  );
};

// const Modal = () => {
//   return (

//   );
// };

export default ProductsTable;
