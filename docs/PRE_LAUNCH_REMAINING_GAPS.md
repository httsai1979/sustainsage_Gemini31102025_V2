# 上線前仍需完成與確認

## 本人需確認

- 六次 Coaching 計畫的正式費用，以及是否公開顯示。
- 取消通知期限、逾期取消、可改期次數、退款與中途終止安排。
- Privacy Policy 的最終資料保存期限與實際處理者清單。
- Coaching Terms 與 Coaching Boundaries 是否需要英國律師審閱。
- 目前所列管理、營運與跨文化背景文字是否均可公開。

## 環境變數

- `RESEND_API_KEY`
- `RESEND_EMAIL_FROM`
- `RESEND_EMAIL_TO`（建議明確設為官方信箱）
- `NEXT_PUBLIC_SITE_URL=https://sustainsage-group.com`
- 選用：`NEXT_PUBLIC_GA_ID`

正式 Resend key 不得提交 repository。缺 key 時 Contact API 會安全失敗並顯示官方信箱。

## 圖片與品牌資產

本輪依任務範圍沒有處理 Logo、hero 圖、人物照、icon 重設、blog 圖與 Git LFS 修復。現有頁面以 CSS 背景與文字結構運作，不依賴缺失圖片，因此不會因缺圖而 build 失敗。正式上線前可另開視覺資產任務，但不應阻擋內容與架構 Preview。

## 上線作業

- 先檢查 Draft PR Preview，不要直接合併或部署 production。
- 在 Preview 測試 Resend 成功、供應商錯誤與缺環境變數三種狀態。
- 驗證 Netlify 對 redirect map 的實際永久狀態碼與 query 保留。
- 驗證正式網域的 canonical、hreflang、robots、sitemap 與 TLS。
- 若啟用分析，先確認 Cookie 同意前不會載入追蹤程式。

## 已知依賴風險

`npm ci` 目前報告 24 個依賴安全項目（1 low、6 moderate、14 high、3 critical）。本輪沒有執行可能造成破壞性升級的 `npm audit fix --force`。上線前應另開依賴更新任務，逐項確認 Next.js、Contentful、Resend、Jest 與 ESLint 的相容版本。
