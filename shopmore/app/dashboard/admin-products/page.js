"use client";

import { useRouter } from "next/navigation";
import ProductsTable from "@/components/ProductsTable";
import commonClasses from "@/styles/Common.module.css";
import classes from "@/styles/AdminDashboard.module.css";

const AdminDashboardPage = () => {
  const router = useRouter();

  return (
    <div className={commonClasses.section} style={{ marginTop: "5rem" }}>
      <div className={commonClasses["section-top"]}>
        <div className={commonClasses["section-title"]}>Products</div>
        <div>
          <button
            onClick={() => {
              router.push("add-product");
            }}
            className={classes.button}
            style={{ marginRight: "0.5rem" }}
          >
            Add Product
          </button>
          <button
            onClick={() => {
              router.push("add-category");
            }}
            className={classes.button}
          >
            Add Category
          </button>
        </div>
      </div>
      <ProductsTable />
    </div>
  );
};

export default AdminDashboardPage;
