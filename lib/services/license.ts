import type { BusinessProfile } from "@/lib/types";

// 사업자등록증 인식.
// TODO(Supabase): 지금은 1.5초 기다린 뒤 샘플 결과를 돌려줍니다.
// 나중에 파일을 Supabase Storage에 올리고 OCR(글자 인식) 기능으로 실제 내용을 읽어오도록 바꿉니다.

export async function recognizeBusinessLicense(file: File): Promise<BusinessProfile> {
  void file;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    businessType: "음식점업",
    industry: "한식",
    region: "서울특별시",
  };
}
