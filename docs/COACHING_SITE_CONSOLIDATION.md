# Coaching 官網收斂說明

## 這次改了什麼

網站已收斂為「Cross-cultural Career Transition Coaching」。公開對象是正在英國生活、工作或準備進入英國職場的華語中生代專業人士。全站只保留一項付費服務：六次、一對一、每次 60 分鐘、約 12–16 週完成的 Career Transition Coaching Programme。

所有品牌定位、客群、四種使用情境、方案、CTA、Hao-Cheng 可公開背景、公司資料、信箱、服務邊界與語言，現在都集中在 `content/siteStrategy.ts`。英國英文與繁體中文共用同一套 schema 與事實層，不再各頁自行維護互相衝突的數字或說法。

## 為什麼這樣改

原網站同時公開多個 package、persona、team、案例與語系，讓使用者難以判斷究竟提供什麼，也使搜尋引擎可能索引大量重複或未完整審核的頁面。本輪把四種情境改成同一服務的入口，並用固定 redirect map 保留舊網址價值。

## 保留頁面

- `/`
- `/coaching`
- `/about`
- `/reflection-tools`
- `/contact`
- 七項 `/tools/[slug]` 非 AI 工具
- Privacy Policy、Cookie Policy、Coaching Terms、Coaching Boundaries
- 404、500 與 Contact API

## 合併、轉址與下架

- How Coaching Works 與 FAQ 已合併到 `/coaching`。
- Returner、UK newcomer、leadership 與 career-change persona 內容已合併到 Coaching 頁四個錨點。
- Services、packages、persona、team、corporate、resources、blog 舊入口都有永久轉址。
- 原 team、testimonial、案例、多方案、價格與非公開語系內容來源已移除。
- Emotion Triangle AI 已從公開入口與靜態檔案下架；保留非 AI Emotion Triangle。

完整對照見 `docs/ROUTE_REDIRECT_MATRIX.md`。

## 表單行為

表單要求姓名、Email、偏好語言、轉換情境、對談用途與隱私確認。後端用 Zod 驗證並轉義使用者內容。缺少 Resend 設定時回傳 `503`，前端提供 `hc.tsai@sustainsage-group.com`，不會顯示假成功。

## 專業假設

- 尚未核准公開價格，因此只寫「計畫細節與費用於適配對談中說明」。
- 尚未確認最終取消、改期與退款條款，因此法律頁明確標示待確認，不製造承諾。
- 本輪不使用人物照、hero 圖、blog 圖或 LFS 資產；文字與 CSS 背景可獨立完成 build。
