"use client";

// for a short description on Thumbnail
export const extractFirstValidParagraph = (richText: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(richText, "text/html");
  const paragraphs = doc.querySelectorAll("p");

  let firstNonEmptyParagraph: string | undefined;

  for (const p of Object.values(paragraphs)) {
    const paragraphWithText = p.textContent?.trim();
    if (paragraphWithText !== "") {
      firstNonEmptyParagraph = paragraphWithText;
      break;
    }
  }

  if (firstNonEmptyParagraph) {
    return firstNonEmptyParagraph.slice(0, 100);
  }

  return "";
};

