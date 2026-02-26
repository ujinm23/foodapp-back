# Admin Эрх Өгөх Заавар

## 🚀 Тодорхой Жишээ: ujinm0223@gmail.com account-д admin эрх өгөх

### Хамгийн хурдан арга (Browser Console):

1. **Website дээр F12 дарж Console нээх**
2. **Дараах кодыг хуулаад ажиллуулах:**

```javascript
const email = "ujinm0223@gmail.com";

console.log("🔍 Хэрэглэгч хайж байна:", email);

fetch("https://foodapp-back-k58d.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", email);
      return;
    }

    console.log("✅ Хэрэглэгч олдлоо!");
    console.log("   Email:", user.email);
    console.log("   ID:", user._id);
    console.log("   Одоогийн Role:", user.role);

    if (user.role === "admin") {
      console.log("ℹ️ Хэрэглэгч аль хэдийн admin эрхтэй байна");
      return;
    }

    console.log("🔄 Admin эрх өгөж байна...");

    return fetch(
      "https://foodapp-back-k58d.onrender.com/api/users/make-admin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      },
    );
  })
  .then((res) => {
    if (!res) return;
    return res.json();
  })
  .then((data) => {
    if (data && data.success) {
      console.log("✅ Admin эрх амжилттай өгөгдлөө!");
      console.log("📝 Шинэ мэдээлэл:", data.user);
      console.log("");
      console.log("📌 Дараагийн алхмууд:");
      console.log("   1. Logout хийх");
      console.log("   2. Login хийх (ujinm0223@gmail.com)");
      console.log("   3. /admin page харна уу");
    } else if (data) {
      console.log("❌ Алдаа:", data.error || data);
    }
  })
  .catch((err) => console.error("❌ Алдаа гарлаа:", err));
```

3. **Үр дүн харах:** Console дээр "✅ Admin эрх амжилттай өгөгдлөө!" гэсэн мессеж гарвал амжилттай.
4. **Logout/Login хийх:** Admin эрх ажиллахын тулд logout хийж, дахин login хийх хэрэгтэй.

---

## Арга 1: MongoDB дээр шууд өөрчлөх (Хамгийн хялбар)

### Алхам 1: MongoDB Compass нээх

1. MongoDB Compass нээх
2. Database-д холбогдох

### Алхам 2: Хэрэглэгч олох

```javascript
// users collection дээр очоод Find filter дээр:
{ "email": "ujinm0223@gmail.com" }
```

### Алхам 3: Role өөрчлөх

1. Олдсон хэрэглэгчийг дарж нээх
2. `role` field-ийг олох
3. `user` → `admin` болгох
4. Update дарна

### Эсвэл MongoDB Shell ашиглах:

```javascript
// 1. Database сонгох
use your_database_name

// 2. Хэрэглэгч олох (ujinm0223@gmail.com жишээ)
db.users.findOne({ email: "ujinm0223@gmail.com" })

// 3. Role-ийг admin болгох
db.users.updateOne(
  { email: "ujinm0223@gmail.com" },
  { $set: { role: "admin" } }
)

// 4. Шалгах
db.users.findOne({ email: "ujinm0223@gmail.com" })
```

## Арга 2: API Endpoint ашиглах

### Алхам 1: Browser Console нээх

1. Website дээр F12 дарна (Developer Tools)
2. Console tab сонгох

### Алхам 2: Хэрэглэгчийн ID олох

```javascript
// Бүх хэрэглэгчдийн жагсаалт авах
fetch("https://foodapp-back-k58d.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    console.log("Бүх хэрэглэгчид:", users);
    // Email-ээр хайх
    const user = users.find((u) => u.email === "your-email@example.com");
    if (user) {
      console.log("User ID:", user._id);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
    } else {
      console.log("Хэрэглэгч олдсонгүй");
    }
  });
```

### Алхам 3: Admin эрх өгөх

```javascript
// Дээрх ID-ийг энд оруулна
const userId = "USER_ID_HERE"; // Жишээ: "67890abcdef1234567890123"

fetch("https://foodapp-back-k58d.onrender.com/api/users/make-admin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: userId,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Үр дүн:", data);
    if (data.success) {
      console.log("✅ Admin эрх амжилттай өгөгдлөө!");
    }
  })
  .catch((err) => console.error("Алдаа:", err));
```

### Бүх алхмыг нэг дор хийх (Жишээ):

```javascript
// 1. Email-ээр хэрэглэгч олох
const email = "your-email@example.com";

fetch("https://foodapp-back-k58d.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй");
      return;
    }

    console.log("Хэрэглэгч олдлоо:", user.email, "ID:", user._id);

    // 2. Admin эрх өгөх
    return fetch(
      "https://foodapp-back-k58d.onrender.com/api/users/make-admin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      },
    );
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      console.log("✅ Admin эрх амжилттай өгөгдлөө!");
      console.log("Одоо logout/login хийж admin page харна уу");
    } else {
      console.log("❌ Алдаа:", data.error);
    }
  })
  .catch((err) => console.error("Алдаа:", err));
```

## User ID олох

1. Backend API: `GET /api/users` - Бүх хэрэглэгчдийн жагсаалт
2. MongoDB: `db.users.find({ email: "user@example.com" })` - Email-ээр хайх

## Өөр хүнд Admin эрх өгөх

### Арга 1: Script ашиглах (Хамгийн хурдан)

1. **Terminal/Command Prompt нээх**
2. **Backend directory руу орох:**

   ```bash
   cd C:\Users\Admin\food-app\foodapp-back
   ```

3. **Email-ээр admin эрх өгөх:**

   ```bash
   node scripts/makeAdminByEmail.js user@example.com
   ```

   **Жишээ:**

   ```bash
   node scripts/makeAdminByEmail.js john@gmail.com
   ```

4. **Үр дүн харах:**
   - Хэрэглэгч олдвол admin эрх өгөгдөнө
   - Хэрэглэгч олдохгүй бол бүх хэрэглэгчдийн жагсаалт харагдана

### Арга 2: Browser Console (Production server дээр)

1. **Website дээр F12 дарж Console нээх**
2. **Дараах кодыг хуулаад email-ийг өөрчлөнө:**

```javascript
// Email-ийг энд өөрчлөнө
const email = "user@example.com";

console.log("🔍 Хэрэглэгч хайж байна:", email);

fetch("https://foodapp-back-k58d.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", email);
      console.log(
        "💡 Бүх хэрэглэгчид:",
        users.map((u) => u.email),
      );
      return;
    }

    console.log("✅ Хэрэглэгч олдлоо!");
    console.log("   Email:", user.email);
    console.log("   ID:", user._id);
    console.log("   Одоогийн Role:", user.role);

    if (user.role === "admin") {
      console.log("ℹ️ Хэрэглэгч аль хэдийн admin эрхтэй байна");
      return;
    }

    console.log("🔄 Admin эрх өгөж байна...");

    return fetch(
      "https://foodapp-back-k58d.onrender.com/api/users/make-admin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      },
    );
  })
  .then((res) => {
    if (!res) return;
    return res.json();
  })
  .then((data) => {
    if (data && data.success) {
      console.log("✅ Admin эрх амжилттай өгөгдлөө!");
      console.log("📝 Шинэ мэдээлэл:", data.user);
      console.log("");
      console.log("📌 Дараагийн алхмууд:");
      console.log("   1. Хэрэглэгч logout/login хийх");
      console.log("   2. /admin page харна уу");
    } else if (data) {
      console.log("❌ Алдаа:", data.error || data);
    }
  })
  .catch((err) => console.error("❌ Алдаа гарлаа:", err));
```

### Арга 3: MongoDB Compass

1. **MongoDB Compass нээх**
2. **users collection дээр очоод Find filter дээр:**
   ```javascript
   { "email": "user@example.com" }
   ```
3. **Олдсон хэрэглэгчийг дарж нээх**
4. **`role` field-ийг `user` → `admin` болгох**
5. **Update дарна**

### Арга 4: MongoDB Shell

```javascript
// 1. Database сонгох
use your_database_name

// 2. Хэрэглэгч олох
db.users.findOne({ email: "user@example.com" })

// 3. Role-ийг admin болгох
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

// 4. Шалгах
db.users.findOne({ email: "user@example.com" })
```
