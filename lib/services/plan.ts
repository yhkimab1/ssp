import type { BusinessProfile, PlanInput, Program } from "@/lib/types";
import { usageWording } from "@/lib/support";

// 사업계획서 초안 생성.
// TODO(Supabase): 지금은 입력값을 정해진 틀(템플릿)에 끼워 넣습니다.
// 나중에 Supabase Edge Function에서 AI를 호출해 문장을 다듬어 주도록 바꿉니다.
//
// 원칙: 사용자가 입력한 내용만 씁니다. 확인되지 않은 칭찬·실적·효과 문장은 만들지 않고,
// 비어 있는 항목은 [추가 입력 필요]로 표시합니다.

const MISSING = "[추가 입력 필요]";

export async function generateBusinessPlan(
  program: Program,
  input: PlanInput,
  profile: BusinessProfile | null,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  /** 입력값이 있으면 (단위를 붙여) 쓰고, 없으면 [추가 입력 필요] */
  const val = (value: string, unit = "") => (value.trim() ? `${value.trim()}${unit}` : MISSING);
  const businessLine = profile
    ? `${profile.businessType} / ${profile.industry} (${profile.region})`
    : MISSING;

  return `사업계획서 (초안)
지원사업: ${program.name}
주관기관: ${program.agency}

────────────────────────────

1. 기업 개요
- 상호명: ${val(input.companyName)}
- 대표자: ${val(input.ownerName)}
- 업태 / 업종: ${businessLine}
- 개업 연도: ${val(input.openedYear, "년")}
- 상시 근로자 수: ${val(input.employees, "명")}
- 최근 연 매출: ${val(input.annualSales, "만 원")}

2. 주요 상품·서비스
${val(input.mainProduct)}

3. 현재 겪고 있는 어려움 (지원 필요성)
${val(input.problem)}

4. ${usageWording(program.supportType).title}
${val(input.fundUsage)}

[추진 일정]
${MISSING}

5. 기대 효과
${MISSING}

────────────────────────────
※ 이 문서는 입력한 내용으로 만든 초안입니다. [추가 입력 필요] 항목을 채우고, 공고문의 지정 양식과 평가 기준에 맞게 다듬어 주세요.
`;
}
