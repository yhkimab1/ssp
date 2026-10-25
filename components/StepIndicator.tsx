const STEPS = ["사업자 정보", "추천 결과", "사업 상세", "사업계획서"];

/** 화면 위쪽의 진행 단계 표시 (current: 1~4) */
export function StepIndicator({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm" aria-label="진행 단계">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const state = step < current ? "done" : step === current ? "current" : "todo";
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-2">
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`flex items-center gap-1.5 ${
                state === "current" ? "font-bold text-brand-700" : state === "done" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <span
                className={`grid size-5 place-items-center rounded-full text-[11px] ${
                  state === "todo" ? "bg-slate-200 text-slate-500" : "bg-brand-600 text-white"
                }`}
              >
                {state === "done" ? "✓" : step}
              </span>
              <span className={state === "current" ? "" : "hidden sm:inline"}>{label}</span>
            </span>
            {step < STEPS.length && <span className="h-px w-3 bg-slate-300 sm:w-6" />}
          </li>
        );
      })}
    </ol>
  );
}
