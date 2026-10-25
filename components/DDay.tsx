"use client";

import { useSyncExternalStore } from "react";
import { daysUntil, localToday } from "@/lib/date";

const noopSubscribe = () => () => {};

/** 마감일 D-day 배지. 날짜는 사용자 컴퓨터 기준이라 브라우저에서만 계산합니다. */
export function DDay({ deadline }: { deadline: string | null }) {
  const today = useSyncExternalStore(noopSubscribe, localToday, () => null);

  if (deadline === null) {
    return <Pill className="bg-emerald-50 text-emerald-700">상시 모집</Pill>;
  }
  if (today === null) {
    return <Pill className="bg-slate-100 text-slate-400">D-?</Pill>;
  }

  const days = daysUntil(deadline, today);
  if (days < 0) return <Pill className="bg-slate-100 text-slate-500">마감</Pill>;
  if (days === 0) return <Pill className="bg-red-600 text-white">오늘 마감</Pill>;
  if (days <= 7) return <Pill className="bg-red-50 text-red-600">D-{days}</Pill>;
  return <Pill className="bg-brand-50 text-brand-700">D-{days}</Pill>;
}

function Pill({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}
