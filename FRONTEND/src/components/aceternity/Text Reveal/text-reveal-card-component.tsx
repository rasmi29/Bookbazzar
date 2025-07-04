"use client";
import {
  TextRevealCard,
} from "./text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center h-[20rem] rounded-2xl w-full">
      <TextRevealCard
        text="Discover Your Favorite Book"
        revealText="Find Your Next Paperback "
      >        
      </TextRevealCard>
    </div>
  );
}
