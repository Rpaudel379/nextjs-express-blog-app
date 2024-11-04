import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import Image from "next/image";
import { BlogType } from "@/common/schema/blog.schema";
import Link from "next/link";

const BlogThumbnail = ({
  category,
  createdAt,
  description,
  primaryImage,
  tags,
  title,
  id,
}: BlogType) => {
  return (
    <div>
      <Link href={`/blogs/${id}`}>
        <Card>
          <div>
            <Image
              src={primaryImage.url}
              alt={"primary Image"}
              className="w-full aspect-video object-cover rounded-t-lg"
              width={2000}
              height={1000}
            />
          </div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Category: {category.name}</CardDescription>
            <CardDescription>
              Tags:{" "}
              {tags?.map((tag) => (
                <span key={tag.id} className="mx-1 bg-slate-100 p-1 rounded-md">
                  {tag.name}
                </span>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Created At: {createdAt.toString()}
            </CardDescription>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default BlogThumbnail;
