// import AddBlog from "@/common/components/user/blogs/add-blog";
// import { CategoryType } from "@/common/schema/category.schema";
// import { TagType } from "@/common/schema/tags.schema";
// import { fetchCategories } from "@/common/services/requests/category";
// import { fetchTags } from "@/common/services/requests/tag";
// import { uploadImageAction } from "@/common/services/actions/image";
import { createBlogAction } from "@/common/services/actions/blogs";
import TextEditor from "@/common/components/TextEditorServer";

const AddBlogPage = async () => {
  return (
    <div>
      {/* <AddBlog
        categories={categories}
        tags={tags}
        uploadImageAction={uploadImageAction}
        createBlogAction={createBlogAction}
      /> */}
      <TextEditor createBlogAction={createBlogAction} />
    </div>
  );
};

export default AddBlogPage;
