// ⬇️ Импорты (как есть)
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// ⬇️ Настройка переменных
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// ⬇️ Подключение middlewares — cors должен идти ПЕРЕД маршрутами
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Увеличиваем лимит тела запроса
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

// ⬇️ Роуты
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ⬇️ Поддержка продакшен-сборки
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ⬇️ Запуск сервера
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
