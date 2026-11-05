import type en from "./en";

const ko: typeof en = {
  meta: {
    title: "AI 큐레이터",
    description:
      "하고 싶은 일을 고르면 그 일에 맞는 AI 도구 2~3개를 이유와 함께 추천해 드려요.",
  },
  header: {
    categories: "카테고리",
    language: "언어",
  },
  hero: {
    title: "하고 싶은 일에 딱 맞는 AI를 찾아보세요",
    desc: "끝없는 목록 대신, 할 일을 고르면 AI 도구 2~3개를 이유와 함께 알려드려요.",
    placeholder: "예: 영상에 자막 넣기",
    search: "검색",
  },
  search: {
    label: "하고 싶은 일로 검색",
    results: "찾은 할 일",
    noResults: "아직 맞는 할 일이 없어요. 카테고리에서 찾아보세요.",
    browse: "카테고리 보기",
  },
  categories: {
    title: "카테고리로 찾기",
    writing: "글쓰기",
    design: "디자인·이미지",
    video: "영상",
    audio: "음악·음성",
    docs: "문서·발표",
    data: "데이터",
    build: "웹·앱 만들기",
  },
  task: {
    heading: "추천 AI 도구",
    why: "추천 이유",
    view: "자세히 보기",
    back: "모든 할 일",
  },
  tool: {
    price: "가격",
    freeTier: "무료 사용",
    difficulty: "시작 난이도",
    language: "언어 지원",
    lastVerified: "마지막 확인",
    officialSite: "공식 사이트 가기",
    usedFor: "이런 일에 추천해요",
    noPrice: "가격은 공식 사이트에서 확인하세요.",
  },
  pricing: {
    free: "무료로 사용 가능",
    freemium: "무료 요금제 있음",
    paid: "유료",
    monthly: "월 {price}",
  },
  difficulty: {
    easy: "쉬움",
    medium: "약간의 학습 필요",
    advanced: "연습 필요",
  },
  footer: {
    disclaimer:
      "가격과 기능은 바뀔 수 있고 지역과 결제 주기에 따라 달라요. 결제 전에 공식 사이트에서 확인하세요.",
    copyright: "© 2026 AI 큐레이터",
  },
  notFound: {
    title: "페이지를 찾을 수 없어요",
    home: "처음으로 돌아가기",
  },
};

export default ko;
