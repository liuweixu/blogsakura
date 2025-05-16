import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";

// 创建路由对象
const router = express.Router();

// 必须添加中间件解析请求体
router.use(express.json());
// 允许跨域
router.use(cors());

// 查所有用户数据
router.get("/backend/channels", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from channel");
    res.json({
      data: rows,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// 往article表格添加一行数据
router.post("/backend/article", async (req, res) => {
  try {
    const { title, content, channel } = req.body;
    if (!title || !content || !channel) {
      return res.status(400).json({
        success: false,
        message: "缺少必填字段",
      });
    }
    const [result] = await pool.query(
      "insert into article (title, content, channel) values (?, ?, ?)",
      [title, content, channel]
    );
    res.json({
      data: {
        success: true,
        message: "添加成功",
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
