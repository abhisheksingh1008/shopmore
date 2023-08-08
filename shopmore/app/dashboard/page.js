"use client";

import { useRouter } from "next/navigation";
import OrdersTable from "@/components/OrdersTable";
import ProductsTable from "@/components/ProductsTable";
import commonClasses from "@/styles/Common.module.css";
import classes from "@/styles/AdminDashboard.module.css";

const AdminDashboardPage = () => {
  const router = useRouter();

  return (
    <>
      <div className={commonClasses.section}>
        <div className={commonClasses["section-top"]}>
          <div className={commonClasses["section-title"]}>Products</div>
          <div>
            <button
              onClick={() => {
                router.replace("/dashboard/add-product");
              }}
              className={classes.button}
              style={{ marginRight: "0.5rem" }}
            >
              Add Product
            </button>
            <button
              onClick={() => {
                router.push("/dashboard/add-category");
              }}
              className={classes.button}
            >
              Add Category
            </button>
          </div>
        </div>
        <ProductsTable />
      </div>
      <div className={commonClasses.section}>
        <div className={commonClasses["section-top"]}>
          <div className={commonClasses["section-title"]}>Orders</div>
        </div>
        <OrdersTable />
      </div>
    </>
  );
};

export default AdminDashboardPage;

// const productColumns = [
//   {
//     header: "Name",
//     accessorkey: "name",
//   },
//   {
//     header: "Category",
//     accessorkey: "category",
//   },
//   {
//     header: "Price",
//     accessorkey: "price",
//   },
//   {
//     header: "In Stock",
//     accessorkey: "countInStock",
//   },
//   {
//     header: "Discount",
//     accessorkey: "discount",
//   },
//   {
//     header: "Edit",
//     cell: <TbEdit />,
//   },
//   {
//     header: "Delete",
//     cell: <MdDelete />,
//   },
// ];
