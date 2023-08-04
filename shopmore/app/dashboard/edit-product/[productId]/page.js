"use client";

import { useContext, useState, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import Card from "@/components/Card";
import classes from "@/styles/Form.module.css";
import buttonClasses from "@/styles/Button.module.css";
import toast from "react-hot-toast";

const EditProductPage = ({ params }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (!authCtx?.user) {
    router.push("/");
    return;
  }

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    countInStock: 0,
    discount: 0,
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState("");

  const inputChangeHandler = (event) => {
    setProduct((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const fetchProductDetails = async () => {
    setIsLoading(true);
    setIsError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${params.productId}`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setProduct(data.product);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/categories`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setCategories(data.categories);
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${params.productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authCtx?.user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            brand: product.brand,
            countInStock: product.countInStock,
            discount: product.discount,
            image: product.image,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      if (data.success) {
        toast.success("Product updated successfully!");
      }

      router.back();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={classes.login}>
      <Card className={classes["form-card"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div>{isError}</div>
        ) : (
          <>
            <h1 className={classes.heading}>Edit Product</h1>
            <form onSubmit={formSubmitHandler}>
              <div className={classes["form-controls"]}>
                <div className={classes["form-control"]}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={inputChangeHandler}
                    required
                    autoFocus
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={product.brand}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={inputChangeHandler}
                    required
                  >
                    <option value={product.category}>{product.category}</option>
                    {categories.length > 0 &&
                      categories.map((category) => {
                        return (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="countInStock">Count in Stock</label>
                  <input
                    type="number"
                    id="countInStock"
                    name="countInStock"
                    value={product.countInStock}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="discount">Discount</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    min={0}
                    max={100}
                    value={product.discount}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="image">Product Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </div>
                <div className={classes["form-actions"]}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${classes["form-action"]} ${buttonClasses.button}`}
                  >
                    {product.isSubmitting ? (
                      <LoadingSpinner className={classes.loadingSpinner} />
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      router.back();
                    }}
                    className={`${classes["form-action"]} ${buttonClasses.button}`}
                  >
                    Cancel
                  </button>
                </div>
                {product.errorMessage ? (
                  <div className={classes.error}>{product.errorMessage}</div>
                ) : (
                  <div>{product.success}</div>
                )}
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default EditProductPage;
