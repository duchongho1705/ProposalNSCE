# 🔥 Hướng Dẫn Setup Firebase Realtime Database (2 phút)

## Tại sao cần Firebase?
- **Không có Firebase**: Góp ý chỉ lưu trên máy hiện tại (localStorage)
- **Có Firebase**: Góp ý đồng bộ realtime giữa TẤT CẢ thiết bị truy cập link

---

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Nhấn **"Create a project"** (hoặc "Tạo dự án")
3. Đặt tên: `ncse-proposal` → Next
4. Bỏ chọn Google Analytics (không cần) → **Create Project**

## Bước 2: Tạo Realtime Database

1. Trong Firebase Console, chọn menu **Build → Realtime Database**
2. Nhấn **"Create Database"**
3. Chọn vùng: **Singapore (asia-southeast1)** → Next
4. Chọn **"Start in test mode"** → Enable
   > ⚠️ Test mode cho phép đọc/ghi tự do trong 30 ngày. Đủ dùng cho proposal.

## Bước 3: Lấy Firebase Config

1. Trong Firebase Console, nhấn biểu tượng ⚙️ (Settings) → **Project settings**
2. Kéo xuống phần **"Your apps"**, nhấn **Web** (`</>`)
3. Đặt nickname: `ncse-web` → **Register app**
4. Copy đoạn `firebaseConfig`:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB...",
    authDomain: "ncse-proposal.firebaseapp.com",
    databaseURL: "https://ncse-proposal-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ncse-proposal",
    storageBucket: "ncse-proposal.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

## Bước 4: Dán Config vào `index.html`

Mở file `index.html`, tìm đoạn:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    ...
};
```

Thay thế bằng config thật vừa copy ở Bước 3.

## Bước 5: Deploy lên GitHub Pages

```bash
git add .
git commit -m "Add Firebase feedback sync"
git push
npm run deploy
```

---

## ✅ Kiểm tra

1. Mở trang web trên **2 thiết bị khác nhau** (hoặc 2 trình duyệt)
2. Thêm góp ý trên thiết bị A
3. Thiết bị B sẽ thấy góp ý xuất hiện **ngay lập tức** (realtime)

## 🔒 Bảo mật (Tuỳ chọn, sau khi xong proposal)

Vào **Realtime Database → Rules**, thay thế bằng:
```json
{
  "rules": {
    "feedbacks": {
      ".read": true,
      ".write": true
    }
  }
}
```

> Đây là rules mở cho phép ai cũng đọc/ghi feedback. Phù hợp cho proposal review.
