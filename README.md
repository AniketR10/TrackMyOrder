# 🏦 Order Sync Dashboard

A full-stack application for managing and syncing orders across multiple sales channels (like Amazon, Shopify, etc.) with real-time statistics and error recovery.

---

## 🔍 Features

* View available sales channels
* Sync orders per channel manually
* Retry failed order syncs globally
* Clear all orders from the system
* View real-time order status statistics (pending / failed / success)

---

## 📁 Project Structure

```
order-sync-dashboard/
├── frontend/         # React + Tailwind (Vite)
├── server/           # Express.js + MongoDB
```

---

## 🚀 Tech Stack

### Frontend:

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="80"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="80"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="80"/>

### Backend Server:

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="80"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="80"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="80"/>

### Deployment:

* Hosted on [Render](https://render.com)
* MongoDB hosted on [MongoDB Atlas](https://cloud.mongodb.com)

---

## ⚙️ Installation (Local)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/TrackMyOrder.git
cd TrackMyOrder
```

### 2. Setup Backend

```bash
cd server
npm install
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev  
```
---

## API Endpoints

* `GET /api/orders/test` - for initial testing if the routes are correctly working or not
* `GET /api/orders/channelList` - List of available channels
* `POST /api/orders/sync/:channel` - Sync orders for a specific channel
* `POST /api/orders/sync-all` - Sync orders for all the given channels by the user
* `POST /api/orders/retry` - Retry failed orders
* `DELETE /api/orders/clear-all` - Clear all orders
* `GET /api/orders/stats` - Get current statistics

---


Built with ❤️ by AniketXD
