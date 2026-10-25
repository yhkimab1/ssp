"use client";

import { useStoredValue } from "@/lib/storage";
import type { Program } from "@/lib/types";

/** 필요 서류 체크리스트. 체크한 내용은 브라우저에 저장돼서 다시 와도 남아 있어요. */
export function DocumentChecklist({ programId, documents }: { programId: string; documents: Program["documents"] }) {
  const [checked = [], setChecked] = useStoredValue<string[]>(`ssp:checklist:${programId}`, []);
  const done = documents.filter((doc) => checked.includes(doc.name)).length;
  const percent = Math.round((done / documents.length) * 100);

  function toggle(name: string) {
    setChecked(checked.includes(name) ? checked.filter((n) => n !== name) : [...checked, name]);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold text-slate-900">필요 서류 체크리스트</h2>
        <span className="text-sm font-semibold text-brand-600">
          {done}/{documents.length}
        </span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="서류 준비 진행률"
      >
        <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <ul className="mt-4 space-y-1">
        {documents.map((doc) => {
          const isChecked = checked.includes(doc.name);
          return (
            <li key={doc.name}>
              <label className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(doc.name)}
                  className="mt-0.5 size-5 shrink-0 accent-brand-600"
                />
                <span>
                  <span className={`block text-sm ${isChecked ? "text-slate-400 line-through" : "text-slate-800"}`}>
                    {doc.name}
                  </span>
                  {doc.note && <span className="block text-xs text-slate-500">{doc.note}</span>}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {done === documents.length && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
          서류 준비가 모두 끝났어요!
        </p>
      )}
    </section>
  );
}
