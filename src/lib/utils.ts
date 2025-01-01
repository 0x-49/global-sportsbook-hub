import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTraffic(visits: number) {
  if (visits >= 1000000) {
    return `${(visits / 1000000).toFixed(1)}M`;
  } else if (visits >= 1000) {
    return `${(visits / 1000).toFixed(1)}K`;
  } else if (visits === 0) {
    return "0";
  }
  return visits.toString();
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
