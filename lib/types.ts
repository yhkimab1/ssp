// 앱 전체에서 쓰는 데이터 모양(타입) 정의

/** 사업자등록증에서 읽어오는(또는 직접 선택한) 사업자 정보 */
export type BusinessProfile = {
  /** 업태 (예: 음식점업) */
  businessType: string;
  /** 업종 (예: 한식) */
  industry: string;
  /** 사업장 소재지 시/도 (예: 서울특별시) */
  region: string;
};

export type ProgramCategory =
  | "자금 지원"
  | "시설·환경 개선"
  | "교육·컨설팅"
  | "판로·마케팅"
  | "디지털 전환";

/** 지원 방식. 융자·보증은 갚거나 보증받는 돈이라 "지원금"이라고 부르지 않습니다. */
export type SupportType = "보조금" | "융자" | "보증" | "바우처" | "교육·컨설팅";

/** 정부지원사업 한 건 */
export type Program = {
  id: string;
  name: string;
  /** 주관기관 */
  agency: string;
  category: ProgramCategory;
  supportType: SupportType;
  /** national = 전국 사업, regional = 지역 사업 */
  scope: "national" | "regional";
  /** "전국" 또는 시/도 이름 */
  region: string;
  /** 지원 규모 표시용 문구 (융자한도·보증한도·지원금액 등) */
  amount: string;
  /** 신청 시작일 (YYYY-MM-DD) */
  applyStart: string;
  /** 신청 마감일 (YYYY-MM-DD). null이면 상시 모집 */
  deadline: string | null;
  /** 카드에 보여줄 한 줄 설명 */
  summary: string;
  /** 상세 화면의 사업 소개 */
  description: string;
  /** 지원 내용 */
  supportDetails: string[];
  /** 지원 대상 */
  eligibility: string[];
  /** 지원 대상 업태. "all"이면 업태 제한 없음 */
  targetBusinessTypes: string[] | "all";
  /** 특히 우대하는 업종 (있으면 추천 순위가 올라감) */
  preferredIndustries?: string[];
  /** 필요 서류 */
  documents: { name: string; note?: string }[];
  howToApply: string;
  contact: string;
};

/** 사업계획서 작성 화면에서 입력받는 기업 정보 */
export type PlanInput = {
  companyName: string;
  ownerName: string;
  openedYear: string;
  employees: string;
  annualSales: string;
  mainProduct: string;
  problem: string;
  fundUsage: string;
};
