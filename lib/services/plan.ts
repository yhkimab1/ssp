import type { BusinessProfile, PlanInput, Program } from "@/lib/types";

// 사업계획서 초안 생성.
// TODO(Supabase): 지금은 입력값을 정해진 틀(템플릿)에 끼워 넣습니다.
// 나중에 Supabase Edge Function에서 AI를 호출해 문장을 다듬어 주도록 바꿉니다.

export async function generateBusinessPlan(
  program: Program,
  input: PlanInput,
  profile: BusinessProfile | null,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const or = (value: string, fallback: string) => value.trim() || fallback;
  const businessLine = profile
    ? `${profile.businessType} / ${profile.industry} (${profile.region})`
    : "(업태 / 업종 / 지역)";

  return `사업계획서 (초안)
지원사업: ${program.name}
주관기관: ${program.agency}

────────────────────────────

1. 기업 개요
- 상호명: ${or(input.companyName, "(상호명)")}
- 대표자: ${or(input.ownerName, "(대표자명)")}
- 업태 / 업종: ${businessLine}
- 개업 연도: ${or(input.openedYear, "(개업 연도)")}년
- 상시 근로자 수: ${or(input.employees, "(인원)")}명
- 최근 연 매출: 약 ${or(input.annualSales, "(금액)")}만 원

2. 주요 상품·서비스
${or(input.mainProduct, "(주요 상품·서비스를 적어주세요)")}

저희 매장은 위 상품·서비스를 중심으로 지역 고객에게 꾸준히 사랑받아 왔으며, 품질과 서비스를 꾸준히 개선하고 있습니다.

3. 현재 겪고 있는 어려움 (지원 필요성)
${or(input.problem, "(현재 겪고 있는 어려움을 적어주세요)")}

이러한 어려움을 혼자 힘으로 해결하기에는 비용과 전문성의 한계가 있어, 「${program.name}」의 지원이 꼭 필요합니다.

4. 지원금 활용 계획
${or(input.fundUsage, "(지원금을 어디에 쓸지 적어주세요)")}

[추진 일정]
- 1개월 차: 세부 실행 계획 수립 및 업체 선정
- 2~3개월 차: 지원 내용 실행 (${program.category})
- 4개월 차 이후: 성과 점검 및 개선

5. 기대 효과
- 매출 증대와 고객 만족도 향상
- 운영 효율 개선을 통한 비용 절감
- 안정적인 사업 운영으로 지역 상권 활성화에 기여

────────────────────────────
※ 이 문서는 자동으로 만든 초안입니다. 공고문의 지정 양식과 평가 기준에 맞게 내용을 꼭 다듬어 주세요.
`;
}
