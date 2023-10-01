"use client";

import { useState, useContext } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import Card from "@/components/Card";
import classes from "@/styles/Form.module.css";
import buttonClasses from "@/styles/Button.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoginImage from "@/shared/assets/signin-page-image1.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null,
};

const Login = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (authCtx?.user) {
    router.back();
  }

  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const inputChangeHandler = (event) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setData((prev) => {
      return {
        ...prev,
        isSubmitting: true,
        errorMessage: null,
      };
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message);
      }

      if (responseData.success) {
        toast.success(`Login successful.`);
        toast.success(`Welcome back ${responseData?.user?.name}!`);
      }

      authCtx.login(responseData.user);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // setData((prev) => {
      //   return {
      //     ...prev,
      //     errorMessage: error.message,
      //   };
      // });
    }

    setData((prev) => {
      return {
        ...prev,
        isSubmitting: false,
      };
    });
  };

  return (
    <div className={classes.login}>
      <Image
        src={LoginImage}
        className={classes["form-image"]}
        alt="login page image"
      />
      <Card className={classes["form-card"]}>
        <h1 className={classes.heading}>Sign In</h1>
        <form onSubmit={formSubmitHandler} autoComplete="on">
          <div className={classes["form-controls"]}>
            <div className={classes["form-control"]}>
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={inputChangeHandler}
                required
                autoFocus
              />
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="password">Password : </label>
              <div className={classes["password-field-wrapper"]}>
                <input
                  type={showPassword ? "text" : "password"}
                  id={classes["password"]}
                  name="password"
                  value={data.password}
                  onChange={inputChangeHandler}
                  className={classes["password-field"]}
                  required
                />
                <button
                  type="button"
                  className={classes["toggle-pass-btn"]}
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? (
                    <IoMdEyeOff className={classes["eye-icon"]} />
                  ) : (
                    <IoMdEye className={classes["eye-icon"]} />
                  )}
                </button>
              </div>
            </div>
            <div className={classes["form-actions"]}>
              <button
                type="submit"
                disabled={data.isSubmitting}
                className={`${classes["form-action"]} ${buttonClasses.button}`}
              >
                {data.isSubmitting ? (
                  <LoadingSpinner className={classes.loadingSpinner} />
                ) : (
                  "Sign In"
                )}
              </button>
              <button
                type="button"
                className={`${classes["form-action"]} ${buttonClasses.button}`}
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    email: "guestuser@example.com",
                    password: "12345678",
                  }));
                }}
              >
                Get guest user credentials
              </button>
              <button
                type="button"
                className={`${classes["form-action"]} ${buttonClasses.button}`}
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    email: "adminuser@example.com",
                    password: "12345678",
                  }));
                }}
              >
                Get Admin user credentials
              </button>
            </div>
            <div className={`${classes.register} ${classes["form-action"]}`}>
              Don't have an account?{" "}
              <Link className={classes.link} href={"/signup"}>
                Sign up
              </Link>
            </div>
            {data.errorMessage && (
              <div className={classes.error}>{data.errorMessage}</div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
