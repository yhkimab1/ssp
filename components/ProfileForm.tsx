"use client";

import { useState } from "react";
import { BUSINESS_TYPES, INDUSTRIES_BY_TYPE, REGIONS } from "@/lib/options";
import type { BusinessProfile } from "@/lib/types";

/** 업태·업종·지역 선택 폼 */
export function ProfileForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: BusinessProfile | null;
  submitLabel: string;
  onSubmit: (profile: BusinessProfile) => void;
}) {
  const [businessType, setBusinessType] = useState(initial?.businessType ?? "");
  const [industry, setIndustry] = useState(initial?.industry ?? "");
  const [region, setRegion] = useState(initial?.region ?? "");

  const industries = INDUSTRIES_BY_TYPE[businessType] ?? [];
  const complete = businessType && industry && region;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (complete) onSubmit({ businessType, industry, region });
      }}
    >
      <Field label="업태" hint="사업자등록증의 '업태' 칸">
        <select
          value={businessType}
          onChange={(e) => {
            setBusinessType(e.target.value);
            setIndustry("");
          }}
          className={selectClass}
          required
        >
          <option value="">업태를 선택하세요</option>
          {BUSINESS_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>

      <Field label="업종" hint="사업자등록증의 '종목' 칸">
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={selectClass}
          disabled={!businessType}
          required
        >
          <option value="">{businessType ? "업종을 선택하세요" : "업태를 먼저 선택하세요"}</option>
          {industries.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>

      <Field label="지역 (시/도)" hint="사업장 소재지">
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass} required>
          <option value="">지역을 선택하세요</option>
          {REGIONS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        disabled={!complete}
        className="w-full rounded-xl bg-brand-600 px-5 py-4 text-lg font-bold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {submitLabel}
      </button>
    </form>
  );
}

const selectClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:bg-slate-100 disabled:text-slate-400";

function Field({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="text-xs text-slate-500">{hint}</span>
      </span>
      {children}
    </label>
  );
}
