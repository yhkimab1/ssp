import type { SupportType } from "@/lib/types";

// 지원 방식에 맞는 표현. 융자·보증·교육 사업에는 "지원금"이라는 말을 쓰지 않습니다.

/** 금액 칸의 이름 */
export function amountLabel(type: SupportType) {
  switch (type) {
    case "보조금":
      return "지원금액";
    case "융자":
      return "융자한도";
    case "보증":
      return "보증한도";
    default:
      return "지원 규모";
  }
}

/** 사업계획서에서 "돈(지원)을 어디에 쓸지" 항목의 이름과 질문 */
export function usageWording(type: SupportType) {
  switch (type) {
    case "보조금":
      return { title: "지원금 활용 계획", question: "지원금을 어디에 쓰고 싶나요?" };
    case "융자":
    case "보증":
      return { title: "자금 사용계획", question: "빌린 자금을 어디에 쓸 계획인가요?" };
    default:
      return { title: "지원 활용 계획", question: "지원받은 내용을 어떻게 활용할 계획인가요?" };
  }
}
