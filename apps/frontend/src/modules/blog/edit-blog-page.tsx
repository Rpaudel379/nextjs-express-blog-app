import TextEditor from "@/common/components/TextEditorServer";
import { BlogType } from "@/common/schema/blog.schema";
import { updateBlogAction } from "@/common/services/actions/blogs";
import { fetchBlogById } from "@/common/services/requests/blogs";

type Props = {
  id: string;
};

const EditBlogPage = async ({ id }: Props) => {
  const { data: blog }: { data?: BlogType } = await fetchBlogById(id);

  return (
    <div>
      <TextEditor
        blog={blog}
          updateBlogAction={updateBlogAction}
      />
    </div>
  );
};

export default EditBlogPage;
