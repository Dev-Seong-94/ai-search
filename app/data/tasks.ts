import type { ToolSlug } from "./tools";
import type { CategorySlug, Localized } from "./types";

export interface TaskPick {
  /** Typed against the tool list, so a pick for an unknown tool fails the build. */
  tool: ToolSlug;
  reason: Localized;
}

export interface Task {
  slug: string;
  category: CategorySlug;
  title: Localized;
  keywords: Localized<string[]>;
  picks: TaskPick[];
}

export const categories: {
  slug: CategorySlug;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
}[] = [
  { slug: "writing", icon: "✍️", color: "primary" },
  { slug: "design", icon: "🎨", color: "tertiary" },
  { slug: "video", icon: "🎬", color: "secondary" },
  { slug: "audio", icon: "🎵", color: "tertiary" },
  { slug: "docs", icon: "📑", color: "primary" },
  { slug: "data", icon: "📊", color: "secondary" },
  { slug: "build", icon: "🌐", color: "tertiary" },
];

function l<T>(ko: T, en: T, ja: T): Localized<T> {
  return { ko, en, ja };
}

export const tasks: Task[] = [
  {
    slug: "write-blog-post",
    category: "writing",
    title: l("블로그 글 쓰기", "Write a blog post", "ブログ記事を書く"),
    keywords: l(
      ["블로그", "글쓰기", "포스팅", "초안", "원고"],
      ["blog", "article", "post", "draft", "writing"],
      ["ブログ", "記事", "文章", "下書き", "投稿"],
    ),
    picks: [
      {
        tool: "claude",
        reason: l(
          "긴 글의 초안을 잡고 문장을 다듬는 데 좋아요.",
          "Good for drafting long pieces and refining the sentences.",
          "長い文章の下書きや推敲に向いています。",
        ),
      },
      {
        tool: "chatgpt",
        reason: l(
          "주제 아이디어부터 초안까지 한곳에서 빠르게 해볼 수 있어요.",
          "Takes you from topic ideas to a draft quickly, all in one place.",
          "テーマ出しから下書きまで一か所で素早く進められます。",
        ),
      },
      {
        tool: "wrtn",
        reason: l(
          "한국 서비스라서 한국어 화면으로 바로 시작하기 편해요.",
          "A Korean service, so it is an easy start if you work in Korean.",
          "韓国のサービスなので、韓国語で作業するなら始めやすいです。",
        ),
      },
    ],
  },
  {
    slug: "polish-work-email",
    category: "writing",
    title: l("업무 메일 다듬기", "Polish a work email", "仕事のメールを整える"),
    keywords: l(
      ["메일", "이메일", "업무", "맞춤법", "문법", "교정"],
      ["email", "mail", "work", "grammar", "spelling", "proofread"],
      ["メール", "仕事", "ビジネス", "文法", "校正"],
    ),
    picks: [
      {
        tool: "grammarly",
        reason: l(
          "이미 쓴 글의 맞춤법과 표현을 바로 잡아줘요.",
          "Catches spelling and phrasing problems in what you have already written.",
          "書いた文章のスペルや表現をその場で直してくれます。",
        ),
      },
      {
        tool: "claude",
        reason: l(
          "상황을 설명하면 어조에 맞춰 문장을 다시 써줘요.",
          "Describe the situation and it rewrites the message in the right tone.",
          "状況を伝えると、適切なトーンで書き直してくれます。",
        ),
      },
    ],
  },
  {
    slug: "translate-document",
    category: "writing",
    title: l("문서 번역하기", "Translate a document", "文書を翻訳する"),
    keywords: l(
      ["번역", "영어", "일본어", "외국어", "문서"],
      ["translate", "translation", "korean", "japanese", "language", "document"],
      ["翻訳", "英語", "韓国語", "外国語", "文書"],
    ),
    picks: [
      {
        tool: "deepl",
        reason: l(
          "번역 전문 서비스이고 문서 파일도 그대로 번역할 수 있어요.",
          "A dedicated translation service that also handles whole document files.",
          "翻訳専門のサービスで、文書ファイルもそのまま翻訳できます。",
        ),
      },
      {
        tool: "grammarly",
        reason: l(
          "무료 웹 번역기로 짧은 글을 번역하고 표현까지 다듬기 좋아요.",
          "Its free web translator suits short text you also want to polish.",
          "無料のウェブ翻訳で短い文章を訳し、表現も整えられます。",
        ),
      },
    ],
  },
  {
    slug: "youtube-thumbnail",
    category: "design",
    title: l("유튜브 썸네일 만들기", "Make a YouTube thumbnail", "YouTubeのサムネイルを作る"),
    keywords: l(
      ["유튜브", "썸네일", "표지", "배너", "디자인"],
      ["youtube", "thumbnail", "cover", "banner", "design"],
      ["YouTube", "ユーチューブ", "サムネイル", "バナー", "デザイン"],
    ),
    picks: [
      {
        tool: "canva",
        reason: l(
          "썸네일 템플릿을 고르고 글자만 바꾸면 돼서 가장 쉬워요.",
          "The easiest route: pick a thumbnail template and change the text.",
          "テンプレートを選んで文字を変えるだけなので、最も手軽です。",
        ),
      },
      {
        tool: "ideogram",
        reason: l(
          "글자가 들어간 이미지를 처음부터 생성하고 싶을 때 좋아요.",
          "A good fit when you want to generate an image with text from scratch.",
          "文字入りの画像を一から生成したいときに向いています。",
        ),
      },
    ],
  },
  {
    slug: "generate-image",
    category: "design",
    title: l("글로 이미지 만들기", "Create an image from text", "文章から画像を作る"),
    keywords: l(
      ["이미지", "그림", "일러스트", "로고", "포스터", "사진", "생성"],
      ["image", "picture", "illustration", "logo", "poster", "art", "generate"],
      ["画像", "イラスト", "ロゴ", "ポスター", "絵", "生成"],
    ),
    picks: [
      {
        tool: "chatgpt",
        reason: l(
          "대화하듯 말로 고쳐가며 만들 수 있어요. 무료 요금제는 사용량이 제한돼요.",
          "Refine the image by talking to it. The free plan has limited use.",
          "会話しながら画像を修正できます。無料プランでは利用量に制限があります。",
        ),
      },
      {
        tool: "firefly",
        reason: l(
          "무료로 매일 조금씩 써볼 수 있어서 처음 시작하기 좋아요.",
          "A good first step, with some free generations every day.",
          "毎日少しずつ無料で試せるので、最初の一歩に向いています。",
        ),
      },
      {
        tool: "midjourney",
        reason: l(
          "무료 체험은 없지만 분위기와 작품성이 중요할 때 고려해 보세요.",
          "No free trial, but worth considering when mood and artistry matter most.",
          "無料トライアルはありませんが、雰囲気や作品性を重視するなら検討できます。",
        ),
      },
    ],
  },
  {
    slug: "product-photo",
    category: "design",
    title: l("제품 사진 꾸미기", "Touch up product photos", "商品写真を仕上げる"),
    keywords: l(
      ["제품", "상품", "사진", "배경 제거", "쇼핑몰", "판매"],
      ["product", "photo", "background", "remove", "shop", "store"],
      ["商品", "写真", "背景", "切り抜き", "ネットショップ", "販売"],
    ),
    picks: [
      {
        tool: "photoroom",
        reason: l(
          "제품 사진 전용이라 사진이 많을 때 작업이 빨라요.",
          "Built for product photos, so it speeds things up when you have many.",
          "商品写真に特化しているので、枚数が多いときに効率的です。",
        ),
      },
      {
        tool: "canva",
        reason: l(
          "사진을 넣어 상세페이지나 홍보 이미지까지 함께 만들 수 있어요.",
          "Lets you carry on and build listing pages or promo images from the photo.",
          "写真を使って商品ページや宣伝画像まで一緒に作れます。",
        ),
      },
    ],
  },
  {
    slug: "add-subtitles",
    category: "video",
    title: l("영상에 자막 넣기", "Add subtitles to a video", "動画に字幕を付ける"),
    keywords: l(
      ["자막", "영상", "동영상", "유튜브", "쇼츠", "편집"],
      ["subtitles", "captions", "video", "youtube", "shorts", "edit"],
      ["字幕", "テロップ", "動画", "YouTube", "ショート", "編集"],
    ),
    picks: [
      {
        tool: "vrew",
        reason: l(
          "자동 자막을 만든 뒤 문서처럼 고칠 수 있어서 초보자에게 좋아요.",
          "Beginner-friendly: make auto captions, then fix them like a document.",
          "自動字幕を作って文書のように直せるので、初心者に向いています。",
        ),
      },
      {
        tool: "capcut",
        reason: l(
          "자막 말고도 효과와 편집까지 한 앱에서 끝내고 싶을 때 좋아요.",
          "Good when you also want effects and editing in the same app.",
          "字幕以外の効果や編集も一つのアプリで済ませたいときに向いています。",
        ),
      },
      {
        tool: "descript",
        reason: l(
          "말이 많은 인터뷰나 팟캐스트 영상을 대본 중심으로 다듬기 좋아요.",
          "Suits talk-heavy interviews and podcasts that you edit through the transcript.",
          "インタビューやポッドキャストを文字起こし中心で編集するのに向いています。",
        ),
      },
    ],
  },
  {
    slug: "generate-video-clip",
    category: "video",
    title: l("글로 짧은 영상 만들기", "Create a short clip from text", "文章から短い動画を作る"),
    keywords: l(
      ["영상 생성", "영상", "동영상", "광고", "짧은 영상", "숏폼"],
      ["video", "generate", "clip", "ad", "short", "text to video"],
      ["動画生成", "動画", "広告", "ショート", "クリップ"],
    ),
    picks: [
      {
        tool: "runway",
        reason: l(
          "글이나 이미지로 영상 장면을 직접 생성해 볼 수 있어요.",
          "Lets you generate video scenes directly from text or images.",
          "テキストや画像から動画のシーンを直接生成できます。",
        ),
      },
      {
        tool: "google-flow",
        reason: l(
          "Google의 영상 생성 도구예요. 쓸 수 있는 범위는 로그인해서 확인해 보세요.",
          "Google's video generation tool. Sign in to see what your account includes.",
          "Googleの動画生成ツールです。利用できる範囲はログインしてご確認ください。",
        ),
      },
      {
        tool: "firefly",
        reason: l(
          "이미 쓰는 Adobe 환경에서 영상 생성까지 해보고 싶을 때 좋아요.",
          "A natural choice if you already work with Adobe tools.",
          "すでにAdobe製品を使っているなら自然な選択です。",
        ),
      },
    ],
  },
  {
    slug: "avatar-video",
    category: "video",
    title: l(
      "얼굴 없이 설명 영상 만들기",
      "Make an explainer video without filming",
      "撮影なしで説明動画を作る",
    ),
    keywords: l(
      ["아바타", "설명 영상", "교육", "강의", "회사 소개", "발표자"],
      ["avatar", "explainer", "training", "presenter", "company", "course"],
      ["アバター", "説明動画", "研修", "講座", "会社紹介"],
    ),
    picks: [
      {
        tool: "heygen",
        reason: l(
          "대본만 넣으면 아바타 영상이 나오고, 다른 언어로 번역도 할 수 있어요.",
          "Add a script to get an avatar video, then translate it into other languages.",
          "台本からアバター動画を作成でき、他の言語にも翻訳できます。",
        ),
      },
      {
        tool: "synthesia",
        reason: l(
          "회사 교육이나 안내 영상처럼 업무용 영상에 잘 맞아요.",
          "A good match for work videos such as training and how-to guides.",
          "社内研修や案内動画などの業務用動画に向いています。",
        ),
      },
    ],
  },
  {
    slug: "make-a-song",
    category: "audio",
    title: l("노래·배경음악 만들기", "Make a song or background music", "曲やBGMを作る"),
    keywords: l(
      ["노래", "음악", "작곡", "배경음악", "BGM", "가사"],
      ["song", "music", "compose", "background music", "bgm", "lyrics"],
      ["曲", "音楽", "作曲", "BGM", "歌詞"],
    ),
    picks: [
      {
        tool: "suno",
        reason: l(
          "원하는 분위기만 적으면 노래가 나와서 음악을 몰라도 시작할 수 있어요.",
          "Describe the mood and get a song, with no music knowledge needed.",
          "雰囲気を書くだけで曲ができるので、音楽の知識がなくても始められます。",
        ),
      },
      {
        tool: "chatgpt",
        reason: l(
          "가사를 먼저 함께 쓰고 그 가사로 곡을 만들 때 좋아요.",
          "Useful for writing the lyrics first, then taking them to a music tool.",
          "先に歌詞を一緒に考え、その歌詞で曲を作るときに便利です。",
        ),
      },
    ],
  },
  {
    slug: "voiceover",
    category: "audio",
    title: l("영상 내레이션 만들기", "Create a voiceover", "ナレーションを作る"),
    keywords: l(
      ["내레이션", "더빙", "음성", "성우", "목소리", "TTS", "읽어주기"],
      ["voiceover", "narration", "voice", "dubbing", "tts", "text to speech"],
      ["ナレーション", "音声", "声優", "吹き替え", "読み上げ"],
    ),
    picks: [
      {
        tool: "typecast",
        reason: l(
          "한국어를 주요 언어로 지원해서 한국어 내레이션에 먼저 써볼 만해요.",
          "Treats Korean as a main language, so try it first for Korean narration.",
          "韓国語・日本語を主要言語として扱っており、まず試す価値があります。",
        ),
      },
      {
        tool: "elevenlabs",
        reason: l(
          "여러 언어로 내레이션을 만들어야 할 때 좋아요.",
          "A good fit when you need narration in several languages.",
          "複数の言語でナレーションを作りたいときに向いています。",
        ),
      },
    ],
  },
  {
    slug: "make-presentation",
    category: "docs",
    title: l("발표 자료 만들기", "Make a presentation", "プレゼン資料を作る"),
    keywords: l(
      ["발표", "PPT", "피피티", "슬라이드", "프레젠테이션", "제안서"],
      ["presentation", "ppt", "powerpoint", "slides", "deck", "pitch"],
      ["プレゼン", "PPT", "パワポ", "スライド", "資料", "提案書"],
    ),
    picks: [
      {
        tool: "gamma",
        reason: l(
          "주제만 입력해도 슬라이드 초안이 나와서 빠르게 시작할 수 있어요.",
          "Type a topic and get a slide draft, so you start fast.",
          "テーマを入力するだけでスライドの下書きができ、すぐに始められます。",
        ),
      },
      {
        tool: "canva",
        reason: l(
          "디자인을 직접 만지면서 템플릿으로 완성하고 싶을 때 좋아요.",
          "Better when you want to finish the design by hand from a template.",
          "テンプレートを使って自分でデザインを仕上げたいときに向いています。",
        ),
      },
      {
        tool: "copilot",
        reason: l(
          "회사에서 PowerPoint를 써야 하고 Microsoft 365를 구독 중이라면 좋아요.",
          "The one to use if you must work in PowerPoint and subscribe to Microsoft 365.",
          "PowerPointを使う必要があり、Microsoft 365を契約しているなら便利です。",
        ),
      },
    ],
  },
  {
    slug: "summarize-documents",
    category: "docs",
    title: l("긴 자료 요약하기", "Summarize long documents", "長い資料を要約する"),
    keywords: l(
      ["요약", "PDF", "논문", "보고서", "공부", "자료 정리"],
      ["summarize", "summary", "pdf", "paper", "report", "study"],
      ["要約", "PDF", "論文", "レポート", "勉強", "資料"],
    ),
    picks: [
      {
        tool: "gemini-notebook",
        reason: l(
          "내가 넣은 자료를 바탕으로 답해서 여러 자료를 묶어 공부할 때 좋아요.",
          "Answers from the sources you add, which suits studying across many documents.",
          "追加した資料をもとに答えるので、複数の資料をまとめて勉強するのに向いています。",
        ),
      },
      {
        tool: "claude",
        reason: l(
          "긴 문서 하나를 올려서 요약하고 이어서 질문하기 좋아요.",
          "Good for uploading one long document, summarizing it, and asking follow-ups.",
          "長い文書を1つアップロードして要約し、続けて質問するのに向いています。",
        ),
      },
    ],
  },
  {
    slug: "research-topic",
    category: "docs",
    title: l("출처와 함께 조사하기", "Research a topic with sources", "出典付きで調べる"),
    keywords: l(
      ["조사", "검색", "리서치", "출처", "자료 찾기", "시장 조사"],
      ["research", "search", "sources", "citations", "look up", "market"],
      ["調査", "検索", "リサーチ", "出典", "調べる", "市場調査"],
    ),
    picks: [
      {
        tool: "perplexity",
        reason: l(
          "답마다 출처가 붙어 있어서 내용을 직접 확인하기 쉬워요.",
          "Answers come with sources, so the claims are easy to check yourself.",
          "回答に出典が付くので、内容を自分で確認しやすいです。",
        ),
      },
      {
        tool: "gemini",
        reason: l(
          "Google 계정만 있으면 바로 질문하며 조사를 시작할 수 있어요.",
          "All you need is a Google account to start asking questions.",
          "Googleアカウントがあれば、すぐに質問して調べ始められます。",
        ),
      },
    ],
  },
  {
    slug: "analyze-spreadsheet",
    category: "data",
    title: l("엑셀 데이터 분석하기", "Analyze spreadsheet data", "Excelのデータを分析する"),
    keywords: l(
      ["엑셀", "데이터", "분석", "차트", "그래프", "표", "매출"],
      ["excel", "spreadsheet", "data", "analysis", "chart", "graph", "csv"],
      ["Excel", "エクセル", "データ", "分析", "グラフ", "表", "売上"],
    ),
    picks: [
      {
        tool: "julius",
        reason: l(
          "데이터 분석 전용이라 파일을 올리고 말로 물어보면 차트까지 나와요.",
          "Made for data analysis: upload a file, ask in plain words, and get charts.",
          "データ分析専用で、ファイルをアップして尋ねるとグラフまで作れます。",
        ),
      },
      {
        tool: "chatgpt",
        reason: l(
          "이미 쓰고 있다면 파일을 올려 간단한 분석부터 해보기 좋아요.",
          "If you already use it, upload a file and start with a simple analysis.",
          "すでに使っているなら、ファイルをアップして簡単な分析から試せます。",
        ),
      },
      {
        tool: "copilot",
        reason: l(
          "Excel 안에서 바로 작업하고 싶고 Microsoft 365를 구독 중이라면 좋아요.",
          "Works if you want to stay inside Excel and subscribe to Microsoft 365.",
          "Excelの中で作業したく、Microsoft 365を契約しているなら便利です。",
        ),
      },
    ],
  },
  {
    slug: "write-resume",
    category: "writing",
    title: l("이력서·자기소개서 쓰기", "Write a resume or cover letter", "履歴書・職務経歴書を書く"),
    keywords: l(
      ["이력서", "자기소개서", "자소서", "취업", "이직", "면접"],
      ["resume", "cv", "cover letter", "job", "interview"],
      ["履歴書", "職務経歴書", "自己PR", "就職", "転職", "面接"],
    ),
    picks: [
      {
        tool: "chatgpt",
        reason: l(
          "내 경험을 적어주면 지원 공고에 맞춰 초안을 잡아줘요. 사실인지는 꼭 직접 확인하세요.",
          "Share your experience and it drafts to fit the job posting. Always check the facts yourself.",
          "経験を伝えると求人に合わせて下書きを作ります。内容が事実かは必ずご自身で確認してください。",
        ),
      },
      {
        tool: "claude",
        reason: l(
          "이미 쓴 글을 올려서 어색한 문장을 고치고 피드백을 받기 좋아요.",
          "Good for pasting in what you wrote and getting feedback and sentence fixes.",
          "書いた文章を貼り付けて、不自然な表現の修正やフィードバックを受けるのに向いています。",
        ),
      },
    ],
  },
  {
    slug: "translate-video",
    category: "video",
    title: l("영상을 다른 언어로 번역하기", "Translate a video into another language", "動画を他の言語に翻訳する"),
    keywords: l(
      ["영상 번역", "번역", "더빙", "외국어 자막", "해외"],
      ["translate", "video translation", "dubbing", "foreign", "subtitles"],
      ["動画翻訳", "翻訳", "吹き替え", "外国語", "字幕", "海外"],
    ),
    picks: [
      {
        tool: "heygen",
        reason: l(
          "목소리까지 다른 언어로 바꿔 주는 영상 번역을 지원해요.",
          "Its video translation changes the spoken audio, not just the text.",
          "音声まで他の言語に変える動画翻訳に対応しています。",
        ),
      },
      {
        tool: "vrew",
        reason: l(
          "자막만 번역해도 충분할 때 좋아요. 100개가 넘는 언어로 번역할 수 있어요.",
          "A good fit when translated subtitles are enough, with over 100 languages.",
          "字幕の翻訳だけで十分なときに向いています。100以上の言語に翻訳できます。",
        ),
      },
    ],
  },
  {
    slug: "meeting-notes",
    category: "docs",
    title: l("회의 내용 기록·요약하기", "Record and summarize meetings", "会議を記録して要約する"),
    keywords: l(
      ["회의", "회의록", "녹음", "받아쓰기", "강의", "음성 기록", "요약"],
      ["meeting", "notes", "minutes", "transcribe", "recording", "lecture"],
      ["会議", "議事録", "録音", "文字起こし", "講義"],
    ),
    picks: [
      {
        tool: "clova-note",
        reason: l(
          "한국어 회의라면 먼저 써볼 만해요. 네이버가 만든 서비스예요.",
          "Worth trying first for meetings in Korean. It is made by NAVER.",
          "韓国語の会議ならまず試す価値があります。NAVERのサービスです。",
        ),
      },
      {
        tool: "otter",
        reason: l(
          "영어나 일본어 회의에 좋아요. 공식 지원 목록에 한국어는 없어요.",
          "Good for meetings in English or Japanese. Korean is not officially listed.",
          "英語や日本語の会議に向いています。公式の対応一覧に韓国語はありません。",
        ),
      },
    ],
  },
  {
    slug: "build-website",
    category: "build",
    title: l("코딩 없이 웹사이트 만들기", "Build a website without coding", "コーディングなしでウェブサイトを作る"),
    keywords: l(
      ["웹사이트", "홈페이지", "랜딩페이지", "앱", "웹 앱", "코딩", "노코드"],
      ["website", "landing page", "web app", "app", "coding", "no code", "homepage"],
      ["ウェブサイト", "ホームページ", "ランディングページ", "アプリ", "コーディング", "ノーコード"],
    ),
    picks: [
      {
        tool: "lovable",
        reason: l(
          "로그인이나 저장 기능이 필요한 서비스까지 글로 설명해서 만들어 볼 수 있어요.",
          "Describe it in words and try building even a service that needs logins and saved data.",
          "ログインや保存機能が必要なサービスも、文章で説明して作ってみられます。",
        ),
      },
      {
        tool: "canva",
        reason: l(
          "가게나 행사 소개처럼 단순한 페이지는 템플릿으로 가장 쉽게 만들 수 있어요.",
          "The easiest route for a simple page, like a shop or event, using templates.",
          "お店やイベントの紹介など、シンプルなページならテンプレートで最も手軽に作れます。",
        ),
      },
      {
        tool: "v0",
        reason: l(
          "개발을 조금 안다면 화면을 만들어 코드까지 이어서 다루기 좋아요.",
          "If you know some development, it lets you continue from the interface into the code.",
          "開発の知識が少しあるなら、画面作成からコードの作業まで続けられます。",
        ),
      },
    ],
  },
];

export function getTask(slug: string): Task | undefined {
  return tasks.find((task) => task.slug === slug);
}
