"use client";

import { useSyncExternalStore } from "react";
import { GeneratedName } from "./generatorEngine";

function subscribeFavorites(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("favorites-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favorites-updated", callback);
  };
}

let cachedRaw = "";
let cachedList: GeneratedName[] = [];

function getFavoritesSnapshot(): GeneratedName[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("gfn_favorites") || "[]";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedList = JSON.parse(raw);
    } catch {
      cachedList = [];
    }
  }
  return cachedList;
}

function getFavoritesServerSnapshot(): GeneratedName[] {
  return [];
}

/**
 * Hook to read and update favorites synchronously without cascading useEffect renders.
 */
export function useFavorites(): [GeneratedName[], (list: GeneratedName[]) => void] {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot
  );

  const saveFavorites = (list: GeneratedName[]) => {
    try {
      localStorage.setItem("gfn_favorites", JSON.stringify(list));
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  };

  return [favorites, saveFavorites];
}

/**
 * Hook to detect whether client hydration has completed.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
