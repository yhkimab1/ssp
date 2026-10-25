import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="bg-brand-900 px-4 py-1.5 text-center text-xs text-brand-100">
        현재 화면의 지원사업 정보는 화면 확인용 <strong className="text-white">샘플 데이터</strong>입니다.
      </div>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-900">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">
            길
          </span>
          소상공인 지원 길잡이
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/results"
            className="hidden rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 sm:block"
          >
            추천 결과
          </Link>
          <Link
            href="/upload"
            className="rounded-md bg-brand-50 px-3 py-2 font-medium text-brand-700 hover:bg-brand-100"
          >
            지원사업 찾기
          </Link>
        </nav>
      </div>
    </header>
  );
}
