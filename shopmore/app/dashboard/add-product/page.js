"use client";

import { useContext, useState, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import Card from "@/components/Card";
import classes from "@/styles/Form.module.css";
import buttonClasses from "@/styles/Button.module.css";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  description: "",
  brand: "",
  category: "",
  price: 0,
  countInStock: 0,
  discount: 0,
  image: null,
  isSubmitting: false,
  errorMessage: "",
  success: "",
};

const handleFileUpload = async (filetype, file) => {
  if (!file) return;
  if (!filetype) filetype = "auto";

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${filetype}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce_product_images");

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to upload file.");
  }

  const { secure_url, public_id } = data;

  return { image_url: secure_url, public_id };
};

const AddProductPage = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [formInputs, setFormInputs] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (event) => {
    setFormInputs((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const fetchCategories = async () => {
    if (!authCtx?.user) {
      router.push("/");
      return;
    }

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
    fetchCategories();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setFormInputs((prev) => {
      return {
        ...prev,
        isSubmitting: true,
        errorMessage: "",
      };
    });

    try {
      if (formInputs.name.trim().length === 0) {
        throw new Error("Name is required.");
      }
      if (formInputs.description.trim().length === 0) {
        throw new Error("Description is required.");
      }
      if (formInputs.category.trim().length === 0) {
        throw new Error("Category is required.");
      }
      if (formInputs.brand.trim().length === 0) {
        throw new Error("Brand is required.");
      }
      if (formInputs.price === 0) {
        throw new Error("Price is required.");
      }
      if (formInputs.image === null) {
        throw new Error("Image is required.");
      }

      let imageInfo = await handleFileUpload("image", formInputs.image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx?.user?.token}`,
          },
          body: JSON.stringify({
            name: formInputs.name,
            description: formInputs.description,
            price: formInputs.price,
            imageData: imageInfo,
            category: formInputs.category,
            brand: formInputs.brand,
            countInStock: formInputs.countInStock,
            discount: formInputs.discount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      // console.log(data);

      toast.success("New Product added.");

      setFormInputs(initialState);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setFormInputs((prev) => {
      return {
        ...prev,
        isSubmitting: false,
      };
    });
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
            <h1 className={classes.heading}>Add New Product</h1>
            <form onSubmit={formSubmitHandler}>
              <div className={classes["form-controls"]}>
                <div className={classes["form-control"]}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formInputs.name}
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
                    value={formInputs.description}
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
                    value={formInputs.brand}
                    onChange={inputChangeHandler}
                    required
                  />
                </div>
                <div className={classes["form-control"]}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formInputs.category}
                    onChange={inputChangeHandler}
                    required
                  >
                    <option value=""> </option>
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
                    value={formInputs.price}
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
                    value={formInputs.countInStock}
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
                    value={formInputs.discount}
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
                      setFormInputs((prev) => {
                        return {
                          ...prev,
                          image: event.target.files[0],
                        };
                      });
                    }}
                    required
                  />
                </div>
                <div className={classes["form-actions"]}>
                  <button
                    type="submit"
                    disabled={formInputs.isSubmitting}
                    className={`${classes["form-action"]} ${buttonClasses.button}`}
                  >
                    {formInputs.isSubmitting ? (
                      <LoadingSpinner className={classes.loadingSpinner} />
                    ) : (
                      "Create"
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={formInputs.isSubmitting}
                    onClick={() => {
                      router.back();
                    }}
                    className={`${classes["form-action"]} ${buttonClasses.button}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default AddProductPage;
