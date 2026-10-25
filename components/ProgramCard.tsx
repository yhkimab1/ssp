import Link from "next/link";
import type { Program } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { DDay } from "@/components/DDay";

export function ProgramCard({ program, industryMatch }: { program: Program; industryMatch?: boolean }) {
  return (
    <Link
      href={`/programs/${program.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {program.category}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              program.scope === "national" ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {program.region}
          </span>
          {industryMatch && (
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              내 업종 우대
            </span>
          )}
        </div>
        <DDay deadline={program.deadline} />
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-700">
        {program.name}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{program.agency}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-700">{program.summary}</p>

      <dl className="mt-4 grid gap-1.5 border-t border-slate-100 pt-4 text-sm">
        <div className="flex gap-3">
          <dt className="w-14 shrink-0 text-slate-500">지원금액</dt>
          <dd className="font-semibold text-brand-700">{program.amount}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-14 shrink-0 text-slate-500">마감일</dt>
          <dd className="text-slate-800">
            {program.deadline ? formatDate(program.deadline) : "상시 (예산 소진 시 마감)"}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
