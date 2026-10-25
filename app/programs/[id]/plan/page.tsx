import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StepIndicator } from "@/components/StepIndicator";
import { getProgram, getPrograms } from "@/lib/services/programs";
import { PlanWriter } from "./PlanWriter";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ id: program.id }));
}

export const metadata: Metadata = { title: "사업계획서 작성 | 소상공인 지원 길잡이" };

export default async function PlanPage({ params }: PageProps<"/programs/[id]/plan">) {
  const { id } = await params;
  const program = await getProgram(id);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <StepIndicator current={4} />
      <Link
        href={`/programs/${program.id}`}
        className="mt-6 inline-block text-sm text-slate-500 hover:text-brand-700"
      >
        ← 사업 상세로 돌아가기
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">사업계획서 초안 만들기</h1>
      <p className="mt-2 text-slate-600">
        <strong className="text-slate-900">{program.name}</strong> 신청용 사업계획서 초안을 만들어 드려요.
      </p>
      <PlanWriter program={program} />
    </div>
  );
}
