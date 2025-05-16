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
    res.json({
      success: true,
      message: "查询成功",
      data: rows,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
