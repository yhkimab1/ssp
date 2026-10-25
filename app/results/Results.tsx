"use client";

import Link from "next/link";
import { ProgramCard } from "@/components/ProgramCard";
import { recommendPrograms, type Recommendation } from "@/lib/services/programs";
import { useBusinessProfile } from "@/lib/storage";
import type { Program } from "@/lib/types";

export function Results({ programs }: { programs: Program[] }) {
  const [profile] = useBusinessProfile();

  // 브라우저에 저장된 정보를 아직 읽기 전
  if (profile === undefined) {
    return <div className="mt-8 h-40 animate-pulse rounded-2xl bg-slate-200/60" />;
  }

  if (profile === null) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-xl font-bold text-slate-900">먼저 사업자 정보를 알려주세요</h1>
        <p className="mt-2 text-slate-600">업종·업태·지역을 알아야 맞는 지원사업을 찾아드릴 수 있어요.</p>
        <Link
          href="/upload"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700"
        >
          사업자 정보 입력하기
        </Link>
      </div>
    );
  }

  const { national, regional } = recommendPrograms(programs, profile);
  const total = national.length + regional.length;

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
        신청할 수 있는 지원사업 <span className="text-brand-600">{total}건</span>을 찾았어요
      </h1>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <ProfileItem label="업태" value={profile.businessType} />
          <ProfileItem label="업종" value={profile.industry} />
          <ProfileItem label="지역" value={profile.region} />
        </dl>
        <Link href="/upload" className="text-sm font-semibold text-brand-700 underline-offset-2 hover:underline">
          정보 수정하기
        </Link>
      </div>

      <Section
        title="전국 지원사업"
        description="지역에 상관없이 전국 소상공인이 신청할 수 있어요."
        items={national}
        empty="조건에 맞는 전국 사업이 없어요."
      />
      <Section
        title={`${profile.region} 지원사업`}
        description={`${profile.region}에 사업장이 있으면 신청할 수 있어요.`}
        items={regional}
        empty={`지금은 ${profile.region}에서 조건에 맞는 지역 사업이 없어요.`}
      />
    </>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1.5">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function Section({
  title,
  description,
  items,
  empty,
}: {
  title: string;
  description: string;
  items: Recommendation[];
  empty: string;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <span className="text-sm font-semibold text-brand-600">{items.length}건</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {items.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          {empty}
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ program, industryMatch }) => (
            <ProgramCard key={program.id} program={program} industryMatch={industryMatch} />
          ))}
        </div>
      )}
    </section>
  );
}
