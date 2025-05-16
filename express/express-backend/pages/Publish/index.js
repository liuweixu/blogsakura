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
    const id = snowflake.generate().toString();
    //查询channel表中是否有channel_id
    const [channelRows] = await pool.query(
      "select id from channel where name = ?",
      [channel]
    );
    if (channelRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "channel不存在",
      });
    }
    const channel_id = channelRows[0].id;
    const [result] = await pool.query(
      "insert into article (id, title, content, channel_id) values (?, ?, ?, ?)",
      [id, title, content, channel_id]
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
