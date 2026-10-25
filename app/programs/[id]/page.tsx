import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DDay } from "@/components/DDay";
import { StepIndicator } from "@/components/StepIndicator";
import { formatDate } from "@/lib/date";
import { getProgram, getPrograms } from "@/lib/services/programs";
import { DocumentChecklist } from "./DocumentChecklist";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ id: program.id }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const program = await getProgram(id);
  return { title: `${program?.name ?? "지원사업"} | 소상공인 지원 길잡이` };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[id]">) {
  const { id } = await params;
  const program = await getProgram(id);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <StepIndicator current={3} />

      <Link href="/results" className="mt-6 inline-block text-sm text-slate-500 hover:text-brand-700">
        ← 추천 결과로 돌아가기
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <article className="space-y-6">
          <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {program.category}
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  program.scope === "national" ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-700"
                }`}
              >
                {program.scope === "national" ? "전국" : `지역 · ${program.region}`}
              </span>
              <DDay deadline={program.deadline} />
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{program.name}</h1>
            <p className="mt-2 text-slate-500">{program.agency}</p>
            <p className="mt-5 leading-relaxed text-slate-700">{program.description}</p>

            <dl className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <Info label="지원금액" value={program.amount} strong />
              <Info
                label="신청기간"
                value={`${formatDate(program.applyStart)} ~ ${
                  program.deadline ? formatDate(program.deadline) : "상시 (예산 소진 시)"
                }`}
              />
              <Info label="지역" value={program.region} />
              <Info label="주관기관" value={program.agency} />
            </dl>
          </header>

          <InfoSection title="지원 내용" items={program.supportDetails} />
          <InfoSection title="지원 대상" items={program.eligibility} />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">신청 방법</h2>
            <p className="mt-3 text-slate-700">{program.howToApply}</p>
            <p className="mt-2 text-sm text-slate-500">문의: {program.contact}</p>
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6">
          <div className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">사업계획서가 필요하신가요?</h2>
            <p className="mt-1 text-sm text-slate-600">기업 정보 몇 가지만 입력하면 초안을 만들어 드려요.</p>
            <Link
              href={`/programs/${program.id}/plan`}
              className="mt-4 block rounded-xl bg-brand-600 px-5 py-4 text-center font-bold text-white hover:bg-brand-700"
            >
              사업계획서 작성하기
            </Link>
          </div>
          <DocumentChecklist programId={program.id} documents={program.documents} />
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className={`mt-0.5 ${strong ? "font-bold text-brand-700" : "text-slate-900"}`}>{value}</dd>
    </div>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-slate-700">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
