import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// @ts-nocheck

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkAiAvailable(): Promise<boolean> {
  // @ts-ignore
  if (window.ai === undefined) return false;
  // @ts-ignore
  const canCreate = await window.ai.canCreateTextSession();
  return canCreate === "readily";
}
