import type { Metadata } from "next";
import { StepIndicator } from "@/components/StepIndicator";
import { getPrograms } from "@/lib/services/programs";
import { Results } from "./Results";

export const metadata: Metadata = { title: "맞춤 지원사업 | 소상공인 지원 길잡이" };

export default async function ResultsPage() {
  const programs = await getPrograms();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <StepIndicator current={2} />
      <Results programs={programs} />
    </div>
  );
}
