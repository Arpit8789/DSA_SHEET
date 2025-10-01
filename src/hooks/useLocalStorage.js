import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Versioned sheet sync (does NOT touch progress)
export function useVersionedSheetStorage(key, defaultValue, version) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    const storedVersion = localStorage.getItem(key + "_version");
    if (!stored || storedVersion !== String(version)) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      localStorage.setItem(key + "_version", String(version));
      return defaultValue;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key + "_version", String(version));
  }, [key, value, version]);

  return [value, setValue];
}
