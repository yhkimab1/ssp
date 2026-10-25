/** 화면 내용을 불러오는 동안 보여주는 회색 자리표시 */
export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-8 sm:py-12" aria-busy="true" aria-label="불러오는 중">
      <div className="h-5 w-64 rounded bg-slate-200" />
      <div className="mt-8 h-8 w-3/4 rounded bg-slate-200" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="h-80 rounded-2xl bg-slate-200/70" />
        <div className="h-60 rounded-2xl bg-slate-200/70" />
      </div>
    </div>
  );
}
