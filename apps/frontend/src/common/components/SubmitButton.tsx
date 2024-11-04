"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@components/ui/button";

type Props = {
  text: string;
};

export function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {!pending ? text : "loading"}
    </Button>
  );
}
