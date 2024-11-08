import { fetchCategories } from "@/common/services/requests/category";
import { fetchTags } from "@/common/services/requests/tag";
import { CategoryType } from "@/common/schema/category.schema";
import { TagType } from "@/common/schema/tags.schema";
import TextEditorClient from "@components/TextEditorClient";
import { BlogSchema, BlogType } from "@schema/blog.schema";
import { ServerActionState } from "@schema/common.schema";
import { uploadImageAction } from "@/common/services/actions/image";

type Props = {
  createBlogAction?: (blog: BlogSchema) => Promise<ServerActionState<BlogType>>;
  updateBlogAction?: (
    id: string,
    blog: BlogSchema
  ) => Promise<ServerActionState<BlogType>>;
  blog?: BlogType;
};

const TextEditor = async ({
  blog,
  createBlogAction,
  updateBlogAction,
}: Props) => {
  // category selection
  const { data: categories }: { data?: CategoryType[] } =
    await fetchCategories();

  // tags selection
  const { data: tags }: { data?: TagType[] } = await fetchTags();

  return (
    <TextEditorClient
      blog={blog}
      categories={categories}
      tags={tags}
      createBlogAction={createBlogAction}
      updateBlogAction={updateBlogAction}
      uploadImageAction={uploadImageAction}
    />
  );
};

export default TextEditor;
