"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileForm } from "@/components/ProfileForm";
import { recognizeBusinessLicense } from "@/lib/services/license";
import { useBusinessProfile } from "@/lib/storage";
import type { BusinessProfile } from "@/lib/types";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPT_ATTR = "image/*,.pdf,application/pdf";

/** 이미지 또는 PDF인지 확인. 기기에 따라 파일 형식(type)이 비어 있거나 다르게 오기도 해서 확장자도 함께 봅니다. */
function isImageOrPdf(file: File) {
  if (file.type.startsWith("image/") || file.type.includes("pdf")) return true;
  return /\.(pdf|jpe?g|png|webp|heic|heif|gif|bmp|tiff?)$/i.test(file.name);
}

type Mode = "upload" | "manual";
type Status = { step: "idle" } | { step: "reading"; fileName: string } | { step: "done"; fileName: string; result: BusinessProfile };

export function UploadFlow() {
  const router = useRouter();
  const [savedProfile, saveProfile] = useBusinessProfile();
  const [mode, setMode] = useState<Mode>("upload");
  const [status, setStatus] = useState<Status>({ step: "idle" });
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!isImageOrPdf(file)) {
      setError("사진(JPG, PNG 등) 또는 PDF 파일만 올릴 수 있어요.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("파일 크기는 10MB 이하만 가능해요.");
      return;
    }
    setStatus({ step: "reading", fileName: file.name });
    const result = await recognizeBusinessLicense(file);
    setStatus({ step: "done", fileName: file.name, result });
  }

  function finish(profile: BusinessProfile) {
    saveProfile(profile);
    router.push("/results");
  }

  return (
    <div>
      <div role="tablist" className="grid grid-cols-2 rounded-xl bg-slate-200/70 p-1 text-sm font-semibold">
        {(
          [
            ["upload", "사업자등록증 올리기"],
            ["manual", "직접 선택하기"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={mode === value}
            onClick={() => setMode(value)}
            className={`rounded-lg px-3 py-2.5 ${
              mode === value ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        {mode === "manual" ? (
          <>
            <p className="mb-5 text-sm text-slate-600">사업자등록증에 적힌 내용과 같게 골라주세요.</p>
            <ProfileForm
              key={savedProfile ? "saved" : "empty"}
              initial={savedProfile}
              submitLabel="맞춤 지원사업 보기"
              onSubmit={finish}
            />
          </>
        ) : status.step === "idle" ? (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`flex flex-col items-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition ${
                dragging ? "border-brand-500 bg-brand-50" : "border-slate-300"
              }`}
            >
              <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-2xl" aria-hidden>
                📄
              </span>
              <p className="mt-4 font-semibold text-slate-800">사업자등록증 파일을 올려주세요</p>
              <p className="mt-1 text-sm text-slate-500">JPG, PNG, PDF · 10MB 이하</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-5 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700"
              >
                파일 선택
              </button>
              <p className="mt-3 hidden text-xs text-slate-400 sm:block">또는 파일을 이곳에 끌어다 놓으세요</p>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT_ATTR}
                className="hidden"
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </div>
            {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              지금은 화면 확인 단계라 올린 파일은 어디에도 저장되지 않고, 인식 결과는 예시 값으로 채워져요.
            </p>
          </>
        ) : status.step === "reading" ? (
          <div className="flex flex-col items-center py-12 text-center" role="status">
            <span className="size-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
            <p className="mt-5 font-semibold text-slate-800">사업자등록증을 읽고 있어요</p>
            <p className="mt-1 text-sm text-slate-500">{status.fileName}</p>
          </div>
        ) : (
          <>
            <div className="mb-5 rounded-xl bg-brand-50 p-4">
              <p className="font-semibold text-brand-900">인식이 끝났어요</p>
              <p className="mt-1 text-sm text-brand-700">
                아래 내용이 사업자등록증과 다르면 직접 고쳐주세요.
              </p>
              <p className="mt-2 truncate text-xs text-slate-500">파일: {status.fileName}</p>
            </div>
            <ProfileForm initial={status.result} submitLabel="이 정보로 지원사업 찾기" onSubmit={finish} />
            <button
              type="button"
              onClick={() => setStatus({ step: "idle" })}
              className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              다른 파일 올리기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
