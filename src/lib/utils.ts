import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  const allCookies = document.cookie;
  const specificCookie = allCookies
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return specificCookie || "";
}

export function getJSONCookie<TCookieFormat>(name: string) {
  const specificCookie = getCookie(name);
  const decodedCookie = decodeURIComponent(specificCookie);
  return JSON.parse(decodedCookie || "{}") as TCookieFormat;
}

export function deepMerge<T = any>(target: any, ...sources: any[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (typeof target === "object" && typeof source === "object") {
    for (const key in source) {
      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return deepMerge(target, ...sources) as T;
}

export function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export function injectValueInList(list: string[], value: string) {
  if (list.includes(value)) return list;
  return [value, ...list];
}

export function areDatesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.setHours(0, 0, 0, 0).valueOf() ===
    date2.setHours(0, 0, 0, 0).valueOf()
  );
}

export function buildHumanDate(date: Date) {
  return `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true; // Same reference

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}

export function isClientSide() {
  return window?.location !== undefined;
}
