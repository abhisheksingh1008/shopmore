"use client";

import { useContext, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/store/auth-context";
import classes from "@/styles/Navbar.module.css";
import logo from "@/shared/assets/logo.png";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoChevronDownSharp } from "react-icons/io5";
import btnClasses from "@/styles/Button.module.css";
import toast from "react-hot-toast";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const path = usePathname();
  const router = useRouter();

  const [admin, setAdmin] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    authCtx.logout();
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim().length === 0) {
        toast.error("Please enter something in the input");
        return;
      }
      router.push(`/search?find=${search}&page=1`);
    }
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
    <header className={classes.header}>
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
        <div className={classes["navbar-right"]}>
          <div className={`${classes.search} ${classes["navbar-option"]}}`}>
            <form onKeyDown={searchHandler}>
              <FiSearch className={classes["search-icon"]} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
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
            {admin && (
              <li className={`${classes["navbar-link"]} w3-dropdown-hover`}>
                <span>
                  <span>Dashboard</span>
                  <IoChevronDownSharp
                    style={{ verticalAlign: "middle", paddingLeft: "2px" }}
                  />
                </span>
                <div
                  className="w3-dropdown-content w3-bar-block w3-border"
                  style={{ right: 0 }}
                >
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
            <li>
              {authCtx.user ? (
                <span
                  className={`${classes["navbar-link"]} w3-dropdown-hover`}
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <CgProfile
                    style={{ fontSize: "1.3rem", verticalAlign: "middle" }}
                  />
                  <IoChevronDownSharp
                    style={{
                      fontSize: "1.1rem",
                      verticalAlign: "middle",
                      paddingLeft: "2px",
                    }}
                  />
                  <div
                    className="w3-dropdown-content w3-bar-block w3-border"
                    style={{ right: 0 }}
                  >
                    <Link
                      // href={!authCtx.user ? "/login" : "/profile"}
                      href={"/"}
                      className="w3-bar-item w3-button"
                      onClick={() => {
                        setShowNavbar(false);
                      }}
                    >
                      My Account
                    </Link>
                    <Link
                      href={!authCtx.user ? "/login" : "/myorders"}
                      className="w3-bar-item w3-button"
                      onClick={() => {
                        setShowNavbar(false);
                      }}
                    >
                      My Orders
                    </Link>
                    <span
                      className="w3-bar-item w3-button"
                      onClick={logoutHandler}
                    >
                      <FiLogOut style={{ verticalAlign: "middle" }} /> Logout
                    </span>
                  </div>
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
      </nav>
      <div className={`${classes["mobile-search"]}`}>
        <form onKeyDown={searchHandler}>
          <FiSearch className={classes["search-icon"]} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
    </header>
  );
};

export default Navbar;
