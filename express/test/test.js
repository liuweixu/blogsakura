import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";

const router = express.Router();

// 在ES模块中获取__dirname的替代方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../common/mysql.json");
console.log("Config path:", configPath); // 调试路径
const rawData = fs.readFileSync(configPath, "utf-8");
const config = JSON.parse(rawData);

// 创建/test路由
router.use(cors());
router.get("/test", (req, res) => {
  res.json(config);
});

export default router;
