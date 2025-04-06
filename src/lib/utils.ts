import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
export type Resolve<T> = T extends Promise<infer R> ? R : T;
