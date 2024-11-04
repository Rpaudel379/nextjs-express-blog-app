import { fetchCategories } from "@services/requests/category";
import Category from "@/common/components/dashboard/category/category";

const CategoryPage = async () => {
  const categories = await fetchCategories();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">Category</h1>

      {categories.data?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Categories</h1>
        </div>
      )}
 
      {/* <DataTable data={categories.data!} columns={columns} /> */}

      <Category categories={categories.data!} />
    </div>
  );
};

export default CategoryPage;
