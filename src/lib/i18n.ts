// src/lib/i18n.ts
// Simple i18n utility for loading translations and dynamic value replacement

import en from "../locales/en.json";
import ar from "../locales/ar.json";

type Locale = "en" | "ar";

const resources: Record<Locale, Record<string, string>> = { en, ar };

let currentLocale: Locale = "en";

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(key: string, values?: Record<string, string | number>): string {
  let str = resources[currentLocale][key] || key;
  if (values) {
    Object.entries(values).forEach(([k, v]) => {
      str = str.replace(new RegExp(`{${k}}`, "g"), String(v));
    });
  }
  return str;
}

export function getLocale() {
  return currentLocale;
}
