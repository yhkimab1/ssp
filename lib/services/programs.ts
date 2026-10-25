import { PROGRAMS } from "@/data/programs";
import type { BusinessProfile, Program } from "@/lib/types";

// 정부지원사업 데이터를 가져오는 곳.
// TODO(Supabase): 지금은 샘플 파일(data/programs.ts)을 읽고, 나중에 Supabase 테이블 조회로 바꿉니다.

export async function getPrograms(): Promise<Program[]> {
  return PROGRAMS;
}

export async function getProgram(id: string): Promise<Program | undefined> {
  return PROGRAMS.find((program) => program.id === id);
}

export type Recommendation = {
  program: Program;
  /** 내 업종을 우대하는 사업인지 */
  industryMatch: boolean;
};

/** 사업자 정보에 맞는 사업을 골라 전국/지역으로 나눠 돌려줍니다. */
export function recommendPrograms(programs: Program[], profile: BusinessProfile) {
  const matched: Recommendation[] = programs
    .filter((p) => p.scope === "national" || p.region === profile.region)
    .filter(
      (p) =>
        p.targetBusinessTypes === "all" ||
        p.targetBusinessTypes.includes(profile.businessType),
    )
    .map((program) => ({
      program,
      industryMatch: program.preferredIndustries?.includes(profile.industry) ?? false,
    }))
    // 업종 우대 사업을 먼저, 그다음 마감이 가까운 순서 (상시 모집은 뒤로)
    .sort((a, b) => {
      if (a.industryMatch !== b.industryMatch) return a.industryMatch ? -1 : 1;
      return (a.program.deadline ?? "9999") < (b.program.deadline ?? "9999") ? -1 : 1;
    });

  return {
    national: matched.filter((r) => r.program.scope === "national"),
    regional: matched.filter((r) => r.program.scope === "regional"),
  };
}
