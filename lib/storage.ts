"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { BusinessProfile } from "@/lib/types";

// 브라우저(localStorage)에 값을 저장하고, 화면이 바뀌어도 유지되게 해주는 도구.
// TODO(Supabase): 로그인 기능을 붙이면 사용자별로 DB에 저장하도록 바꿀 수 있습니다.

const CHANGE_EVENT = "ssp-storage-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * 저장된 값을 읽고 쓰는 훅.
 * 서버에서 그릴 때(아직 브라우저 값을 모를 때)는 undefined 를 돌려줍니다.
 */
export function useStoredValue<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => undefined,
  );

  const value = useMemo<T | undefined>(() => {
    if (raw === undefined) return undefined;
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // fallback 은 매번 새 객체일 수 있어서 의존성에서 뺍니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const setValue = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // 저장이 막힌 브라우저(사생활 보호 모드 등)에서는 조용히 넘어갑니다.
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key],
  );

  return [value, setValue] as const;
}

export function useBusinessProfile() {
  return useStoredValue<BusinessProfile | null>("ssp:profile", null);
}
