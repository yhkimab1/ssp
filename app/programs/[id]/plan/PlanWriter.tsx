"use client";

import { useState } from "react";
import { generateBusinessPlan } from "@/lib/services/plan";
import { usageWording } from "@/lib/support";
import { useBusinessProfile } from "@/lib/storage";
import type { PlanInput, Program } from "@/lib/types";

const EMPTY: PlanInput = {
  companyName: "",
  ownerName: "",
  openedYear: "",
  employees: "",
  annualSales: "",
  mainProduct: "",
  problem: "",
  fundUsage: "",
};

const FIELDS: {
  key: keyof PlanInput;
  label: string;
  placeholder: string;
  type?: "number" | "textarea";
  suffix?: string;
}[] = [
  { key: "companyName", label: "상호명", placeholder: "예: 행복한 밥상" },
  { key: "ownerName", label: "대표자명", placeholder: "예: 홍길동" },
  { key: "openedYear", label: "개업 연도", placeholder: "예: 2021", type: "number", suffix: "년" },
  { key: "employees", label: "직원 수 (대표 제외)", placeholder: "예: 2", type: "number", suffix: "명" },
  { key: "annualSales", label: "최근 연 매출", placeholder: "예: 15000", type: "number", suffix: "만 원" },
  {
    key: "mainProduct",
    label: "주요 상품·서비스",
    placeholder: "예: 직접 담근 장으로 만든 한식 백반과 계절 반찬",
    type: "textarea",
  },
  {
    key: "problem",
    label: "지금 겪고 있는 어려움",
    placeholder: "예: 점심시간 주문이 몰려 손님 대기가 길고, 인건비 부담으로 직원을 더 뽑기 어려움",
    type: "textarea",
  },
  {
    key: "fundUsage",
    label: "", // 지원 방식에 따라 달라서 화면에서 채웁니다 (lib/support.ts)
    placeholder: "예: 키오스크 1대와 테이블오더를 도입해 주문 시간을 줄이고 인건비를 절감",
    type: "textarea",
  },
];

export function PlanWriter({ program }: { program: Program }) {
  const [profile] = useBusinessProfile();
  const [input, setInput] = useState<PlanInput>(EMPTY);
  const [draft, setDraft] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const usageQuestion = usageWording(program.supportType).question;

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    const text = await generateBusinessPlan(program, input, profile ?? null);
    setDraft(text);
    setGenerating(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("복사하지 못했어요. 글 상자 안을 직접 선택해서 복사해 주세요.");
    }
  }

  function handleDownload() {
    const blob = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `사업계획서_초안_${input.companyName.trim() || program.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
      <form onSubmit={handleGenerate} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">기업 정보 입력</h2>
        {profile && (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            앞에서 입력한 정보도 함께 반영돼요: {profile.businessType} · {profile.industry} · {profile.region}
          </p>
        )}
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="text-sm font-semibold text-slate-800">
              {field.key === "fundUsage" ? usageQuestion : field.label}
            </span>
            {field.type === "textarea" ? (
              <textarea
                rows={3}
                value={input[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => setInput({ ...input, [field.key]: e.target.value })}
                className={`mt-1.5 ${inputClass}`}
              />
            ) : (
              <span className="relative mt-1.5 block">
                <input
                  type={field.type ?? "text"}
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  min={field.type === "number" ? 0 : undefined}
                  value={input[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => setInput({ ...input, [field.key]: e.target.value })}
                  className={`${inputClass} ${field.suffix ? "pr-14" : ""}`}
                />
                {field.suffix && (
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    {field.suffix}
                  </span>
                )}
              </span>
            )}
          </label>
        ))}
        <button
          type="submit"
          disabled={generating}
          className="w-full rounded-xl bg-brand-600 px-5 py-4 text-lg font-bold text-white hover:bg-brand-700 disabled:bg-brand-500/60"
        >
          {generating ? "초안을 만들고 있어요…" : draft ? "다시 만들기" : "사업계획서 초안 만들기"}
        </button>
        <p className="text-xs text-slate-500">빈칸이 있어도 만들 수 있어요. 빈 곳은 [추가 입력 필요]로 표시돼요.</p>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-slate-900">사업계획서 초안</h2>
          {draft && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {copied ? "복사했어요 ✓" : "복사"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                다운로드 (.txt)
              </button>
            </div>
          )}
        </div>
        {draft ? (
          <>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="사업계획서 초안 (직접 고칠 수 있어요)"
              className="mt-4 h-[32rem] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans text-sm leading-relaxed text-slate-800 focus:border-brand-500 focus:outline-none"
            />
            <p className="mt-2 text-xs text-slate-500">초안 내용은 글 상자 안에서 바로 고칠 수 있어요.</p>
          </>
        ) : (
          <div className="mt-4 grid h-64 place-items-center whitespace-pre-line rounded-xl border border-dashed border-slate-300 text-center text-sm text-slate-500">
            {generating ? "잠시만 기다려 주세요…" : "왼쪽에 정보를 입력하고\n‘사업계획서 초안 만들기’를 눌러주세요."}
          </div>
        )}
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
