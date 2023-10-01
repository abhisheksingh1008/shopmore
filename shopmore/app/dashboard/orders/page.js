import OrdersTable from "@/components/OrdersTable";
import commonClasses from "@/styles/Common.module.css";

const page = () => {
  return (
    <div className={commonClasses.section} style={{ marginTop: "5rem" }}>
      <div className={commonClasses.section}>
        <div className={commonClasses["section-top"]}>
          <div className={commonClasses["section-title"]}>Orders</div>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
};

export default page;
