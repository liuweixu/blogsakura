import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";
import { Snowflake } from "@sapphire/snowflake";

// 创建路由对象
const router = express.Router();

//雪花算法时间戳
const epoch = new Date("2020-01-01T00:00:00Z").getTime();
// 雪花算法生成id
const snowflake = new Snowflake(epoch);

// 必须添加中间件解析请求体
router.use(express.json());
// 允许跨域
router.use(cors());

// 获取文章列表
router.get("/backend/articlelist", async (req, res) => {
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

// :id对应前端的${id}
router.delete("/backend/deletearticle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("delete from article where id = ?", [id]);
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "未找到对应文章",
      });
    }
    res.json({
      success: true,
      message: "删除成功",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
