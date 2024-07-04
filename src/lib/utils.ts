import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkAiAvailable(): Promise<boolean> {
  if (window.ai === undefined) return false;
  const canCreate = await window.ai.canCreateTextSession();
  return canCreate === "readily";
}
