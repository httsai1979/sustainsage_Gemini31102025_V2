# SustainSage Coaching Website

SustainSage 是面向正在英國生活、工作或準備進入英國職場的華語中生代專業人士之跨文化職涯轉換 Coaching 網站。

## 公開範圍

- 語言：`en-GB`、`zh-TW`
- 核心頁：Home、Coaching、About、Reflection Tools、Contact
- 唯一方案：六次 Career Transition Coaching Programme
- 唯一主要行動：申請免費 20 分鐘適配對談
- Canonical domain：`https://sustainsage-group.com`

## 開發

```bash
npm ci
npm run check:all
npm run dev
```

內容與事實唯一來源為 [`content/siteStrategy.ts`](content/siteStrategy.ts)。舊服務、persona、team 與 package 路由統一由 [`lib/redirectMap.js`](lib/redirectMap.js) 管理。

## Contact delivery

Contact API 需要：

- `RESEND_API_KEY`
- `RESEND_EMAIL_FROM`
- `RESEND_EMAIL_TO`（未設定時使用官方信箱）

缺少必要設定時，API 回傳 `503`，前端明確顯示官方信箱，不會假裝寄送成功。不要提交 `.env.local`。
