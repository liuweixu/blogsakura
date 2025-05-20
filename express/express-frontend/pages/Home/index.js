import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";

//创建路由对象
const router = express.Router();

// 必须添加中间件解析请求体
router.use(express.json());
// 允许跨域
router.use(cors());

// 获取文章列表
router.get("/home", async (req, res) => {
  try {
    // 使用左连接执行查询
    const [rows] = await pool.query(`
          select a.*, c.name as
          channel_name
          from article a
          left join channel
          c on a.channel_id = c.id
          `);
    const data = rows.map((row) => ({
      ...row,
      id: row.id.toString(), // 将BIGINT转为字符串
    }));
    res.json({
      success: true,
      message: "查询成功",
      data: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
