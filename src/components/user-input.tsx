"use client";
import { cn } from "@/lib/utils";

export interface UserInputProps {
  prompt: string;
  isLoading?: boolean;
  handleSetPrompt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: React.FormEvent) => void;
}

export default function UserInput({
  prompt,
  handleSetPrompt,
  isLoading,
  handleClick,
}: UserInputProps) {
  return (
    <form onSubmit={handleClick} className="relative w-full">
      <input
        value={prompt}
        onChange={handleSetPrompt}
        placeholder="Type something..."
        className="w-full border-2 py-4 px-4 md:text-xl rounded-xl"
        type="text"
      />
      <button
        type="submit"
        className={cn(
          "md:text-xl font-bold border-2 rounded-xl absolute top-2 right-2 shadow-md py-2 px-6",
          "bg-primary text-secondary",
          isLoading ? "cursor-not-allowed bg-gray-600" : "cursor-pointer"
        )}
      >
        &uarr;
      </button>
    </form>
  );
}
