import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

// 创建MySQL连接池
const pool = mysql.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post("/authorizations", async (req, res) => {
  const { mobile, code } = req.body;

  if (!mobile || !code) {
    return res.status(400).json({
      message: "手机号和验证码不能为空",
    });
  }
});
