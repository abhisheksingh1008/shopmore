"use client";

import { useContext, useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/store/auth-context";
import classes from "@/styles/Navbar.module.css";
import logo from "@/shared/assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { PiShoppingCartBold } from "react-icons/pi";
import { RiAccountCircleFill } from "react-icons/ri";
import btnClasses from "@/styles/Button.module.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const path = usePathname();

  const [admin, setAdmin] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const protect = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/protected`,
        {
          headers: {
            Authorization: `Bearer ${authCtx?.user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // console.log(data);

      if (data.result) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authCtx?.user !== null) {
      protect();
    }
  }, [authCtx.user]);

  return (
    <header>
      <nav className={classes.navbar}>
        <Link className={classes["navbar-left"]} href={"/"}>
          <Image
            src={logo}
            width={35}
            height={35}
            alt="App logo"
            priority
            className={classes.logo}
          />
          <div className={classes["app-title"]}>Shopmore</div>
        </Link>
        <div className={classes["navbar-mid"]}>
          <Link
            href={"/"}
            className={
              path === "/"
                ? `${classes["navbar-link"]} ${classes.active}`
                : classes["navbar-link"]
            }
          >
            Home
          </Link>
          <Link
            href={"/products?page=1"}
            className={
              path === "/products"
                ? `${classes["navbar-link"]} ${classes.active}`
                : classes["navbar-link"]
            }
          >
            Products
          </Link>
          <Link
            href={"/categories"}
            className={
              path === "/categories"
                ? `${classes["navbar-link"]} ${classes.active}`
                : classes["navbar-link"]
            }
          >
            Categories
          </Link>
          <Link
            href={authCtx?.user ? "/myorders" : "/login"}
            className={
              path === "/myorders"
                ? `${classes["navbar-link"]} ${classes.active}`
                : classes["navbar-link"]
            }
          >
            My Orders
          </Link>
          {admin && (
            <div className="w3-dropdown-hover">
              <span>Dashboard</span>
              <div className="w3-dropdown-content w3-bar-block w3-border">
                <Link
                  href={"/dashboard/admin-products?page=1&limit=15"}
                  className="w3-bar-item w3-button"
                >
                  Products
                </Link>
                <Link
                  href={"/dashboard/orders"}
                  className="w3-bar-item w3-button"
                >
                  Orders
                </Link>
                <Link
                  href={"/dashboard/add-product"}
                  className="w3-bar-item w3-button"
                >
                  Add Product
                </Link>
                <Link
                  href={"/dashboard/add-category"}
                  className="w3-bar-item w3-button"
                >
                  Add Category
                </Link>
              </div>
            </div>
          )}
          {/* <Link
            href={"/about"}
            className={
              path === "/about"
                ? `${classes["navbar-link"]} ${classes.active}`
                : classes["navbar-link"]
            }
          >
            About
          </Link> */}
        </div>
        <div className={classes["navbar-right"]}>
          <div className={`${classes.search} ${classes["navbar-option"]}}`}>
            <input type="text" placeholder="Search products" />
            <FiSearch className={classes["search-icon"]} />
          </div>
          <Link href={!authCtx?.user ? "login" : "/cart"}>
            <button
              className={`${classes["navbar-option"]} ${btnClasses.button} ${btnClasses["button-with-icon"]}`}
            >
              <PiShoppingCartBold
                className={`${btnClasses["button-icon"]} ${classes["cart-icon"]}`}
              />
              Cart
            </button>
          </Link>
          {authCtx.user ? (
            <button
              className={`${classes["navbar-option"]}} ${btnClasses.button}`}
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <button
              className={`${classes["navbar-right-option"]}} ${btnClasses.button}`}
            >
              <Link href={"/login"}>Sign In</Link>
            </button>
          )}
          {authCtx?.user && (
            <Link href={"/profile"} className={classes["navbar-option"]}>
              <RiAccountCircleFill className={classes["profile-icon"]} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
