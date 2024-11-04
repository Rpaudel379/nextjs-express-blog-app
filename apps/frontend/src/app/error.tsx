"use client"; // Error boundaries must be Client Components

import Navbar from "@/common/components/user/Navbar";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("eee", error);
  }, [error]);

  return (
    <div>
      <Navbar/>
      <h1>root error boundary</h1>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
