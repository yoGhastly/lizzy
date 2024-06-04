import { cn } from "@/app/utils/cn";
import React from "react";

interface HighlightWordsProps {
  highlights: string[];
  text: string;
  highlightClassname?: string;
}


export const HighlightWords: React.FC<HighlightWordsProps> = ({
  highlights,
  highlightClassname,
  text,
}) => {
  // Sort highlights by length in descending order to match longer phrases first
  const sortedHighlights = highlights.sort((a, b) => b.length - a.length);
  // Create a regex pattern to match the words and phrases
  const regex = new RegExp(
    `(${sortedHighlights.map((word) => word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`,
    "gi",
  );
  // Split the text by the regex pattern and map over the parts
  const parts = text.split(regex).filter(Boolean);

  return (
    <p className="text-sm text-muted-gray max-w-[55rem]">
      {parts.map((part, index) =>
        sortedHighlights.some(
          (highlight) => highlight.toLowerCase() === part.toLowerCase(),
        ) ? (
          <span key={index} className={cn(highlightClassname ? highlightClassname : "text-novi-700")}>
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </p>
  );
};
