"use client";

import { useEffect, useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import classes from "@/styles/ProductDetailPage.module.css";
import { BsStarFill } from "react-icons/bs";
import ProductReview from "@/components/ProductReview";
import toast from "react-hot-toast";

const ProductDetailPage = ({ params }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [product, setproduct] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchProductDetails = async () => {
    setisLoading(true);
    setIsError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${params.productId}`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setproduct(data.product);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
    setisLoading(false);
  };

  const addItemToCartHandler = async () => {
    if (!authCtx?.user) {
      router.push("/login");
      return;
    }

    setAddingToCart(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx?.user?.token}`,
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      } else {
        toast.success("Item added to cart!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setAddingToCart(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>{isError}</div>
      ) : (
        product && (
          <div className={classes.wrapper}>
            <div className={classes["image-container"]}>
              <img
                src={product.imageData.image_url}
                alt={`${product.name} image`}
                className={classes["product-image"]}
              />
            </div>
            <div className={classes["product-info"]}>
              <div className={classes["product-name"]}>{product.name}</div>
              <div className={classes["product-rating-section"]}>
                <span className={classes["product-rating"]}>
                  <span>{product.rating} </span>
                  <span>
                    <BsStarFill className={classes["star-icon"]} />
                  </span>
                </span>
                <span className={classes["product-num-reviews"]}>
                  {product.numReviews} Reviews
                </span>
              </div>
              <div className={classes["price-section"]}>
                <span className={classes.price}>&#x20B9;{product.price}</span>
                {product.discount !== 0 && (
                  <span className={classes.discount}>
                    {product.discount}% off
                  </span>
                )}
              </div>
              {product.countInStock === 0 ? (
                <div className={classes["out-of-stock"]}>Out Of Stock</div>
              ) : product.countInStock < 100 ? (
                <div className={classes["stock-left"]}>
                  Hurry only {product.countInStock} left!
                </div>
              ) : (
                ""
              )}
              <div className={classes["product-description"]}>
                {product.description}
              </div>
              {product.countInStock > 0 && (
                <button
                  onClick={addItemToCartHandler}
                  className={classes.button}
                >
                  {addingToCart ? <LoadingSpinner /> : "Add to Cart"}
                </button>
              )}
              <div className={classes.reviews}>
                <div className={classes.heading}>Ratings & Reviews</div>
                {product.reviews.length === 0 ? (
                  <div className={classes["no-reviews"]}>
                    No product reviews.
                  </div>
                ) : (
                  product.reviews.map((review) => {
                    return (
                      <ProductReview
                        key={review.user._id}
                        title={review.title}
                        rating={review.rating}
                        comment={review.comment}
                        userName={review.user.name}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetailPage;
