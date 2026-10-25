import type { Metadata } from "next";
import { StepIndicator } from "@/components/StepIndicator";
import { UploadFlow } from "./UploadFlow";

export const metadata: Metadata = { title: "사업자 정보 입력 | 소상공인 지원 길잡이" };

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <StepIndicator current={1} />
      <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">사업자 정보를 알려주세요</h1>
      <p className="mt-2 text-slate-600">업종·업태·지역을 바탕으로 받을 수 있는 지원사업을 찾아드려요.</p>
      <div className="mt-8">
        <UploadFlow />
      </div>
    </div>
  );
}
