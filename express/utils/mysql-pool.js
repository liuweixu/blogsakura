import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 在ES模块中获取__dirname的替代方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../config/mysql.json");
const rawData = await fs.promises.readFile(configPath, "utf-8");
const config = JSON.parse(rawData);
console.log(config.mysql.host);

// 创建MySQL连接池
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export default pool;
