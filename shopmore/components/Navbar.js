"use client";

import { useContext, useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/store/auth-context";
import classes from "@/styles/Navbar.module.css";
import logo from "@/shared/assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import btnClasses from "@/styles/Button.module.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const path = usePathname();

  const [admin, setAdmin] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

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
      setAdmin(false);
    }
  };

  useEffect(() => {
    protect();
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
          <ul className={showNavbar ? classes.show : ""}>
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
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
            </li>
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
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
            </li>
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
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
            </li>
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
              <Link
                href={!authCtx?.user ? "/login" : "/cart"}
                className={
                  path === "/cart"
                    ? `${classes["navbar-link"]} ${classes.active}`
                    : classes["navbar-link"]
                }
              >
                <HiShoppingCart style={{ verticalAlign: "middle" }} /> Cart
              </Link>
            </li>
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
              <Link
                href={!authCtx.user ? "/login" : "/myorders"}
                className={
                  path === "/myorders"
                    ? `${classes["navbar-link"]} ${classes.active}`
                    : classes["navbar-link"]
                }
              >
                My Orders
              </Link>
            </li>
            {admin && (
              <li className={`${classes["navbar-link"]} w3-dropdown-hover`}>
                <span>Dashboard</span>
                <div className="w3-dropdown-content w3-bar-block w3-border">
                  <Link
                    href={"/dashboard/admin-products?page=1&limit=15"}
                    className="w3-bar-item w3-button"
                    onClick={() => {
                      setShowNavbar(false);
                    }}
                  >
                    Products
                  </Link>
                  <Link
                    href={"/dashboard/orders?page=1&limit=12"}
                    className="w3-bar-item w3-button"
                    onClick={() => {
                      setShowNavbar(false);
                    }}
                  >
                    Orders
                  </Link>
                  <Link
                    href={"/dashboard/add-product"}
                    className="w3-bar-item w3-button"
                    onClick={() => {
                      setShowNavbar(false);
                    }}
                  >
                    Add Product
                  </Link>
                  <Link
                    href={"/dashboard/add-category"}
                    className="w3-bar-item w3-button"
                    onClick={() => {
                      setShowNavbar(false);
                    }}
                  >
                    Add Category
                  </Link>
                </div>
              </li>
            )}
            {authCtx.user && (
              <li
                onClick={() => {
                  setShowNavbar(false);
                }}
              >
                <Link
                  href={!authCtx.user ? "/login" : "/profile"}
                  className={
                    path === "/profile"
                      ? `${classes["navbar-link"]} ${classes.active}`
                      : classes["navbar-link"]
                  }
                >
                  My Account
                </Link>
              </li>
            )}
            <li
              onClick={() => {
                setShowNavbar(false);
              }}
            >
              {authCtx.user ? (
                <span
                  className={classes["navbar-link"]}
                  onClick={logoutHandler}
                >
                  <FiLogOut style={{ verticalAlign: "middle" }} /> Logout
                </span>
              ) : (
                <Link href={"/login"} className={classes["navbar-link"]}>
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <button
                onClick={() => {
                  setShowNavbar(false);
                }}
                className={btnClasses.button}
              >
                Close
              </button>
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            setShowNavbar((prev) => !prev);
          }}
          className={`${classes["hamburger-icon"]} ${btnClasses.button}`}
        >
          {!showNavbar ? "☰" : "╳"}
        </button>
        {/* <div className={classes["navbar-right"]}>
          <div className={`${classes.search} ${classes["navbar-option"]}}`}>
            <input type="text" placeholder="Search products" />
            <FiSearch className={classes["search-icon"]} />
          </div>
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
