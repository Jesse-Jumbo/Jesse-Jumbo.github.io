# Jesse Chiang｜江婕瀅

嗨，我是 Jesse，主要做後端開發，也參與過前端、特教遊戲和研究工具的製作。

這裡是我的個人網站原始碼。網站整理了我做過的專案、工作經驗、修課背景，以及技術分享與社群活動。

**[前往個人網站](https://jesse-jumbo.github.io/)** · **[English](https://jesse-jumbo.github.io/en/)**

## 我做過的事

- **特教遊戲開發**：在 PTWA（中華民國愛自造者學習協會）開發約 27 款特教遊戲、製作共用模板，並帶領兩位成大同學一起開發。[體驗遊戲](https://ptwa-npo.github.io/) · [專案原始碼](https://github.com/PTWA-NPO/PTWA-NPO.github.io)
- **FOVY**：早期使用 Next.js 開發前端、部署於 Render，後續參與後端與微服務開發。[產品網站](https://www.fovyskill.com/)
- **技術分享**：曾與 Ivan Chiou 在 2023 iThome Cloud Summit 共同分享特教遊戲專案，我負責的部分涵蓋需求、模板設計與開發驗證。[演講介紹](https://cloudsummit.ithome.com.tw/2023/speaker-page/1116)
- **Tainan.py**：參與籌辦台南 Python 社群活動，留下了 [2022 年「Tainan.py：重啟」](https://www.accupass.com/event/2212051154471502282108)與 [2023 年「Python In Tainan」](https://www.accupass.com/event/2304211233301635228960)兩場紀錄。目前缺少接手籌辦的總召，歡迎有興趣的朋友[聯絡我](https://jesse-jumbo.github.io/#contact)。

更多作品、實作細節與工作經驗，可以在網站裡查看。

## 作品畫面與致謝

網站中的遊戲截圖來自 [TankMan](https://github.com/Jesse-Jumbo/TankMan) 和團隊作品 [Program Design II](https://github.com/Jesse-Jumbo/program-design-II)。感謝一起完成專案的夥伴，也謝謝原素材作者；美術與音效的來源請見各專案說明。

FOVY 的程式碼未公開，可以透過產品網站了解服務。其他作品若有公開原始碼，都附在網站的作品介紹中。

<details>
<summary>網站開發與維護</summary>

## 本機預覽

網站使用 HTML、CSS 與 JavaScript，透過 Node.js 產生中英文頁面。需要 Node.js 18 以上版本，沒有第三方建置套件，不需執行 `npm install`。

```sh
npm run build
npm run check
python3 -m http.server 8000
```

在瀏覽器開啟 <http://localhost:8000/>。

## 檔案結構

| 內容 | 檔案 |
| --- | --- |
| 中英文文案、經歷與作品 | `src/content.mjs` |
| HTML 產生程式 | `scripts/build.mjs` |
| 樣式與響應式排版 | `assets/styles.css` |
| 作品篩選與 Email 複製 | `assets/site.js` |

修改文案或版面後，執行 `npm run build`，並一併提交產生的 `index.html` 與 `en/index.html`。直接編輯這兩份 HTML 的變更，會在下次建置時被覆蓋。

## 部署

GitHub Pages 的發布來源使用 **Deploy from a branch → main / (root)**。`.nojekyll` 讓 GitHub Pages 直接提供已建置的靜態檔案。

發布前執行 `npm run build` 與 `npm run check`，再將變更提交至 `main`。

</details>
