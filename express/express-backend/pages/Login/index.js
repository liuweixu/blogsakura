import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// 创建路由对象
const router = express.Router();
// 生成32位随机字符串
// const randomString = crypto.randomBytes(32).toString("hex");
// 定义密钥
const SECRET_KEY = "3a7f9b2e4c1d8e5f0a6c3b9e8d2f1e7";

// 允许跨域
router.use(cors());
// 必须添加中间件解析请求体
router.use(express.json());
//查所有用户数据
router.get("/backend/users", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from user");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//查数据，查看手机号对应的code是否正确，并返回token
router.post("/backend/users", async (req, res) => {
  const formData = req.body;
  const phone = formData["mobile"];
  const code = formData["code"];
  try {
    const [rows] = await pool.query("select * from user where mobile = ?", [
      phone,
    ]);
    if (rows.length > 0) {
      if (rows[0].code === code) {
        // 生成token
        const token = jwt.sign({ phone }, SECRET_KEY, { expiresIn: "2h" });
        res.json({
          data: {
            token: token,
          },
        });
      } else {
        res.json({
          success: false,
          message: "验证码错误",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 导出路由对象
export default router;
