const connectToDB = require("../db");
const UserModel = require("../schemas/userSchema");

const checkUserRole = async () => {
  try {
    await connectToDB();
    console.log("✅ Database холбогдлоо\n");

    const email = "ujinm0223@gmail.com";
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", email);
      process.exit(1);
    }

    console.log("🔍 Хэрэглэгчийн мэдээлэл:");
    console.log(`   Email: ${user.email}`);
    console.log(`   First Name: ${user.firstName}`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Role: ${user.role}`);
    console.log(
      `   Is Admin: ${user.role === "admin" ? "✅ Тийм" : "❌ Үгүй"}`,
    );
    console.log("");

    if (user.role !== "admin") {
      console.log("⚠️ Хэрэглэгч admin эрхгүй байна!");
      console.log("💡 Admin эрх өгөхийн тулд:");
      console.log("   node scripts/makeUserAdmin.js");
      process.exit(1);
    } else {
      console.log("✅ Хэрэглэгч admin эрхтэй байна!");
      console.log("");
      console.log("📌 Дараагийн алхмууд:");
      console.log("   1. Logout хийх (одоогийн session-аас)");
      console.log("   2. Login хийх (энэ email-ээр)");
      console.log("   3. Admin Panel харах");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Алдаа гарлаа:", err);
    process.exit(1);
  }
};

checkUserRole();
