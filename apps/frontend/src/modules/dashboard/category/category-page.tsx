import { fetchCategories } from "@services/requests/category";
import Category from "@/common/components/dashboard/category/category";
import { CategoryType } from "@/common/schema/category.schema";

const CategoryPage = async () => {
  const { data: categories }: { data?: CategoryType[] } =
    await fetchCategories();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">Category</h1>

      {categories?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Categories</h1>
        </div>
      )}

      <Category categories={categories} />
    </div>
  );
};

export default CategoryPage;

{
  /* <DataTable data={categories.data!} columns={columns} /> */
}
