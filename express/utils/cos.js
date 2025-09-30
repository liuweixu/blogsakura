import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 在ES模块中获取__dirname的替代方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../config/cos.json");
const rawData = await fs.promises.readFile(configPath, "utf-8");
const config = JSON.parse(rawData);

const COSConfig = {
  SecretId: config.tencent.secretId,
  SecretKey: config.tencent.secretKey,
  Bucket: config.tencent.bucket,
  Region: config.tencent.region,
  appId: config.tencent.appId,
};

export default { COSConfig };