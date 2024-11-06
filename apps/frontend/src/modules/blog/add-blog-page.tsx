import AddBlog from "@/common/components/user/blogs/add-blog";
import { CategoryType } from "@/common/schema/category.schema";
import { fetchCategories } from "@/common/services/requests/category";
import { fetchTags } from "@/common/services/requests/tag";
import { uploadImageAction } from "@/common/services/actions/image";

const AddBlogPage = async () => {
  const { data }: { data?: CategoryType[] } = await fetchCategories();
  const { data: tags } = await fetchTags();

  // const { data: images } = await fetchImages();
  // console.log(images);

  return (
    <div>
      <AddBlog
        categories={data}
        tags={tags!}
        uploadImageAction={uploadImageAction}
      />
    </div>
  );
};

export default AddBlogPage;
