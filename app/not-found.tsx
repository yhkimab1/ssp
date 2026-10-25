import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">찾으시는 페이지가 없어요</h1>
      <p className="mt-3 text-slate-600">주소가 바뀌었거나 없는 지원사업일 수 있어요.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/results" className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">
          추천 결과 보기
        </Link>
        <Link href="/" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">
          처음으로
        </Link>
      </div>
    </div>
  );
}
