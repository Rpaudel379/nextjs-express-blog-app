import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import Image from "next/image";
import { fetchBlogById } from "@/common/services/requests/blogs";

// async function getBlogById(id: string) {
//   const blog = await fetchBlogById(id);
//   return blog.data;
// }

type Props = {
  id: string;
};

const BlogPage = async ({ id }: Props) => {
  const { data } = await fetchBlogById(id);
  const blog = data!;

  return (
    <div className="flex justify-center">
      <Card className="w-2/3 text-center">
        <CardHeader>
          <CardTitle>
            <p className="text-4xl">{blog.title}</p>
          </CardTitle>
          <CardDescription>Category: {blog?.category.name}</CardDescription>
          <CardDescription>
            Tags:{" "}
            {blog.tags?.map((tag) => (
              <span key={tag.id} className="mx-1 bg-slate-100 p-1 rounded-md">
                {tag.name}
              </span>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>{blog.description}</CardDescription>

          <div className="my-4">
            <p>Primary Image</p>
            <Image
              src={blog.primaryImage.url}
              alt={"primary Image"}
              className="w-full object-cover aspect-video"
              width={1000}
              height={500}
            />
          </div>
          <div>
            <p>Images</p>
            {blog.images?.map((image) => {
              return (
                <Image
                  key={image.id}
                  src={image.url}
                  alt="images"
                  className="w-full object-cover aspect-video"
                  width={1000}
                  height={500}
                />
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription>Created At: {blog.createdAt.toString()} </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPage;
