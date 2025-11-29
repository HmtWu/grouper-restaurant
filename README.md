# ℃斑 × 王 專案

極簡黑白高級風的活魚海鮮餐廳網站 + Node.js/Express REST API + JSON 假資料 + Mongoose Schema。

## 安裝與啟動
1. 進入 backend：`cd backend`
2. 安裝套件：`npm install`
3. 啟動伺服器：`npm start`（預設 http://localhost:3000）
4. 前端靜態檔由 Express 服務，路徑為 `/frontend`。

API:
- GET/POST/PUT/DELETE `/api/fish`
- GET/POST/PUT/DELETE `/api/menu`
- GET/POST/DELETE `/api/reservations`

前端頁面：
- /frontend/index.html (Home)
- /frontend/about.html
- /frontend/fish.html (魚種資料動態載入)
- /frontend/dishes.html
- /frontend/menu.html (菜單動態載入)
- /frontend/reserve.html (訂位表單 + API)
