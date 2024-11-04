import { Button } from "@/common/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Blog Not Found</h2>
      <Button>
        <Link href="/">Return to all blogs</Link>
      </Button>
    </div>
  );
}
