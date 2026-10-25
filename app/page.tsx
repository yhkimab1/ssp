import Link from "next/link";

const STEPS = [
  {
    title: "사업자등록증 올리기",
    body: "사진이나 PDF 파일을 올리면 업종·업태·지역을 자동으로 읽어요. 직접 선택해도 돼요.",
  },
  {
    title: "맞춤 지원사업 확인",
    body: "내 업종과 지역에 맞는 전국·지역 지원사업을 마감일 순으로 보여드려요.",
  },
  {
    title: "서류·사업계획서 준비",
    body: "필요 서류 체크리스트와 사업계획서 초안으로 신청 준비를 쉽게 끝내요.",
  },
];

const PROMISES = [
  { label: "몰라서 놓치는 지원사업이 없도록", body: "전국 사업과 우리 지역 사업을 한곳에서 확인" },
  { label: "복잡한 서류는 목록으로", body: "사업마다 필요한 서류를 체크하며 하나씩 준비" },
  { label: "사업계획서는 초안부터", body: "몇 가지 정보만 입력하면 바로 쓸 수 있는 초안 제공" },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm">소상공인 정부지원사업 안내</p>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
            내 가게에 맞는 정부지원사업,
            <br />
            사업자등록증 한 장으로 찾아보세요
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
            어떤 지원사업이 있는지, 무슨 서류가 필요한지 몰라 포기하지 마세요. 맞는 사업을 찾아드리고 사업계획서
            초안까지 함께 준비해 드립니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/upload"
              className="rounded-xl bg-white px-6 py-4 text-center text-lg font-bold text-brand-700 shadow-lg hover:bg-brand-50"
            >
              사업자등록증 올리기
            </Link>
            <p className="text-sm text-brand-100">등록증이 없어도 업종·지역을 직접 선택할 수 있어요.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">이렇게 도와드려요</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="grid size-9 place-items-center rounded-full bg-brand-50 font-bold text-brand-700">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">아는 사람만 받는 지원,<br />이제 누구나 받을 수 있게</h2>
            <p className="mt-3 text-slate-600">
              정부지원사업은 많지만 정보가 흩어져 있고 서류가 복잡해 신청을 포기하는 경우가 많습니다.
            </p>
          </div>
          <ul className="space-y-3">
            {PROMISES.map((item) => (
              <li key={item.label} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                <span className="mt-0.5 text-brand-600" aria-hidden>✓</span>
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-14 text-center">
        <h2 className="text-xl font-bold text-slate-900">지금 바로 내 가게에 맞는 지원사업을 확인해 보세요</h2>
        <Link
          href="/upload"
          className="mt-5 inline-block rounded-xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700"
        >
          지원사업 찾기 시작
        </Link>
      </section>
    </>
  );
}
