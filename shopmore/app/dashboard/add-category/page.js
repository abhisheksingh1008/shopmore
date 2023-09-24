"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import Card from "@/components/Card";
import classes from "@/styles/Form.module.css";
import buttonClasses from "@/styles/Button.module.css";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const initialState = {
  name: "",
  image: null,
  isSubmitting: false,
  errorMessage: null,
};

const handleFileUpload = async (filetype, file) => {
  if (!file) return;
  if (!filetype) {
    filetype = "auto";
  }

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

const AddCategoryPage = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const inputChangeHandler = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addCategoryHandler = async (event) => {
    event.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        isSubmitting: true,
      };
    });

    let imageInfo;
    // try {
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong, failed to create new category.");
    //   return;
    // }

    try {
      if (formData.name.trim().length === 0) {
        throw new Error("Name is required.");
      }
      if (formData.image === null) {
        throw new Error("Image is required.");
      }

      imageInfo = await handleFileUpload("image", formData.image);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            imageData: imageInfo,
          }),
        }
      );

      const data = await response.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      } else {
        toast.success(`New Category added.`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setFormData((prev) => {
      return {
        ...prev,
        isSubmitting: true,
      };
    });

    router.back();
  };

  return (
    <div className={classes.login}>
      <Card className={classes["form-card"]}>
        <h1 className={classes.heading}>Add Category</h1>
        <form onSubmit={addCategoryHandler}>
          <div className={classes["form-controls"]}>
            <div className={classes["form-control"]}>
              <label htmlFor="name">Category Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="image">Image : </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      image: event.target.files[0],
                    };
                  });
                }}
                required
              />
            </div>
          </div>
          <div className={classes["form-actions"]}>
            <button
              type="submit"
              disabled={formData.isSubmitting}
              className={`${classes["form-action"]} ${buttonClasses.button}`}
            >
              {formData.isSubmitting ? (
                <LoadingSpinner className={classes.loadingSpinner} />
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              disabled={formData.isSubmitting}
              onClick={() => {
                router.back();
              }}
              className={`${classes["form-action"]} ${buttonClasses.button}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCategoryPage;
