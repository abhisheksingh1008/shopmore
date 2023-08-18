import AllCategories from "@/components/AllCategories";

const getCategories = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/categories`,
    { cache: "no-store" }
  )
    .then(async (response) => {
      const data = await response.json();
      // console.log(data);
      return data.categories;
    })
    .catch((err) => {
      // console.log(err);
    });

  return categories;
};

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div style={{ padding: "0.5rem 1rem" }}>
      <AllCategories categories={categories} />
    </div>
  );
};

export default Categories;
