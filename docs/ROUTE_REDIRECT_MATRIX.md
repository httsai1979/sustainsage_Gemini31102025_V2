# 路由與轉址矩陣

所有規則集中在 `lib/redirectMap.js`，並設為永久轉址。Next.js 的 `permanent: true` 會輸出永久語意；若由 Netlify 正式上線，應再依本表驗證平台實際狀態碼。

| 舊路由或路由群組 | 新目的地 | 判定 |
|---|---|---|
| `/service`、`/services` | `/coaching` | 單一服務入口 |
| Transition Coaching | `/coaching` | 合併 |
| Reset Sprint、Deepening Practice | `/coaching` | 取消獨立產品 |
| Early-career、graduates、young professionals | `/coaching` | 產品下架，保留安全入口 |
| Career return 與 parent returner 路由 | `/coaching?focus=returning-to-work` | 合併到情境 |
| Immigrant job、newcomer 路由 | `/coaching?focus=new-to-uk` | 合併到情境 |
| Leadership Coaching | `/coaching?focus=leadership-transition` | 合併到情境 |
| Mid-career 路由 | `/coaching?focus=career-change` | 合併到情境 |
| `/about/team/*`、舊人物頁 | `/about` | 公開人物只保留 Hao-Cheng |
| About story、values、approach、ethics | `/about` | 合併 |
| `/resources` | `/reflection-tools` | 重新命名 |
| `/faq` | `/coaching#faq` | 合併 |
| `/blog/*` | `/reflection-tools` | 本版文章下架 |
| `/corporate/*` | `/coaching` | 非本版服務定位 |
| Emotion Triangle AI | `/reflection-tools` | 暫停公開 |
| `/en/*`、`/en-US/*` | 對應預設英文路由 | 舊英文網址收斂 |

`zh-CN`、`zh-HK`、`ja-JP`、`fr-FR`、`es-ES` 不再是 Next.js 公開 locale，不出現在語言選擇器或 sitemap。
