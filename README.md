# Jesse Chiang｜個人網站

江婕瀅（Chieh-Ying Chiang / Jesse）的雙語作品網站，供 GitHub Pages 發布。

GitHub Pages 發布目標：<https://jesse-jumbo.github.io/>

英文版：<https://jesse-jumbo.github.io/en/>

## 網站內容

- 六個代表作品，支援領域篩選與展開設計說明。
- FOVY、成大歷史系實驗室及 PTWA（中華民國愛自造者學習協會）工作經歷。
- 修課背景、實作工具、技術寫作與社群參與。
- Email、GitHub 與 LinkedIn 聯絡方式。
- 手機排版、鍵盤操作、減少動態效果偏好，以及搜尋引擎中繼資料。

## 修改與預覽

使用 Node.js 18 以上版本；沒有第三方建置套件，不需執行 `npm install`。

```sh
npm run build
npm run check
python3 -m http.server 8000
```

在瀏覽器開啟 <http://localhost:8000/>。也可直接開啟 `index.html` 預覽；所有內容與展開說明皆可離線閱讀。

| 要改的內容 | 檔案 |
| --- | --- |
| 中英文文案、經歷、作品 | `src/content.mjs` |
| 版面與 HTML 結構 | `scripts/build.mjs` |
| 顏色、字級、手機排版 | `assets/styles.css` |
| 分類篩選、Email 複製 | `assets/site.js` |

變更文案或版面後，重新執行 `npm run build`，一併提交產生的 `index.html` 與 `en/index.html`。請勿只手動編輯產生的 HTML，否則下次建置會覆蓋修改。

## GitHub Pages

本網站為純靜態檔案，可使用儲存庫 **Settings → Pages → Deploy from a branch → main / (root)** 發布，不需要付費服務或 API 金鑰。`.nojekyll` 讓 Pages 直接提供已產生的靜態內容。

檢查與發布前，請執行 `npm run build && npm run check`。若 Pages 原本使用不同來源分支，請保留既有設定，並把網站檔案提交到該來源。

## 內容與素材

內容依 2026-10-04 提供的履歷、修課資料、早期體驗學習報告，以及公開專案原始碼整理。僅呈現專業經歷；未收錄成績單、生日、學號、電話、住址與原始申請文件。

- `assets/tankman.png`：來自 [TankMan](https://github.com/Jesse-Jumbo/TankMan/blob/main/asset/image/view_ex.png) 的作品畫面。原專案另列美術與音效來源。
- `assets/rpg-battle.png`：來自 [Program Design II](https://github.com/Jesse-Jumbo/program-design-II/blob/main/doc/readme/03-battle.png) 的團隊作品畫面。
- 作品畫面用於展示原專案，素材權利仍屬各原作者；不代表另行授予素材授權。
- FOVY 依履歷與本人補充描述，呈現早期 Next.js／Render 前端及後續後端工作；提供 [產品網站](https://www.fovyskill.com/) 連結，原始碼未公開。
- PTWA 特教遊戲的約 27 款個人開發經驗、共用模板，以及帶領兩位成大同學協作，依本人 2026-10-04 補充；這個數字不等於整個網站目前的遊戲總數。程式碼連向 [PTWA 官方專案](https://github.com/PTWA-NPO/PTWA-NPO.github.io)。
- 2023 iThome Cloud Summit 是 Jesse 與 Ivan Chiou 共同發表；Jesse 的分享涵蓋需求、模板與開發驗證。簡報第 26 頁「專案部署」起及後續自動化內容不列為 Jesse 的個人成果。
- Tainan.py 提供 2022/12/17 與 2023/07/01 的活動紀錄；歡迎接手籌辦的訊息由本人提供，後續情況有變時請更新。
- Program Design II 的個人細項分工在來源 README 中仍有待確認標記，因此網站以團隊成果呈現。
- `history-ai-chatbot` 目前原始碼使用 Gemini 生成答案，與舊 README 的全本機敘述不同；網站採不限定供應商的描述。
- 團隊競賽成績不等同個人獲獎；修課中項目與已修課程分開列示。

原始申請資料、訪談逐字稿與私人工作文件均不應加入此公開儲存庫。
