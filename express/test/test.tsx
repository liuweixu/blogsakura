import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../common/mysql.json");
console.log("Config path:", configPath); // 调试路径
const rawData = fs.readFileSync(configPath, "utf-8");
const config = JSON.parse(rawData);

export default config;
