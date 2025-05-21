import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";

//创建路由对象
const router = express.Router();

// 必须添加中间件解析请求体
router.use(express.json());
// 允许跨域
router.use(cors());
//根据id获取文章信息
router.get("/articleget/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // 使用左连接执行查询
    const [result] = await pool.query("select * from article where id = ?", [
      id,
    ]);
    const [result_channel] = await pool.query(
      "select * from channel where id = ?",
      [result[0].channel_id]
    );
    res.json({
      data: {
        title: result[0].title,
        content: result[0].content,
        channel_name: result_channel[0].name,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// 导出路由对象
export default router;
