"use client";

import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "@/components/Card";
import ReviewRating from "@/components/ReviewRating";
import classes from "@/styles/Form.module.css";
import buttonClasses from "@/styles/Button.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  comment: "",
  rating: 0,
  isSubmitting: false,
  errorMessage: null,
};

const ratingText = ["Very Bad", "Bad", "Good", "Very Good", "Excellent"];

const page = () => {
  const productId = useSearchParams().get("pid");
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

  const addReviewHandler = async (event) => {
    event.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please provide a ratitng.");
      return;
    }

    setFormData((prev) => {
      return {
        ...prev,
        isSubmitting: true,
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
          body: JSON.stringify({
            rating: formData.rating,
            title: formData.title,
            comment: formData.comment,
          }),
        }
      );

      const data = await response.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      } else {
        toast.success(`New Review added.`);
      }

      router.back();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setFormData((prev) => {
      return {
        ...prev,
        isSubmitting: false,
      };
    });
  };

  return (
    <div className={classes.login}>
      <Card className={classes["form-card"]}>
        <h1 className={classes.heading}>Add Review</h1>
        <form onSubmit={addReviewHandler}>
          <div className={classes["form-controls"]}>
            <div className={classes["form-control"]}>
              <label htmlFor="title">Rate this Product :</label>
              <ReviewRating
                onRatingChange={(rating) => {
                  setFormData((prev) => {
                    return { ...prev, rating: rating };
                  });
                }}
              />
              {formData.rating >= 1 && (
                <div style={{ textAlign: "center" }}>
                  {ratingText[formData.rating - 1]}
                </div>
              )}
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="title">Review Title : </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="comment">Comment : </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={inputChangeHandler}
                required
              ></textarea>
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
          </div>
        </form>
      </Card>
    </div>
  );
};

export default page;
