import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines clsx and tailwind-merge
 * to manage class names in a type-safe and conflict-free way.
 * 
 * @param inputs - Class values to be merged
 * @returns - A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
