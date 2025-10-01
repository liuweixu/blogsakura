import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";
import { Snowflake } from "@sapphire/snowflake";
import dayjs from 'dayjs'

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
router.put("/backend/articlelist", async (req, res) => {
  try {
    // 使用左连接执行查询
    const { channel_name } = req.body;
    // const [rows] = await pool.query(`
    // select a.*, c.name as
    // channel_name
    // from article a
    // left join channel
    // c on a.channel_id = c.id
    // `);
    const [rows] = await pool.query(`
      SELECT a.*, c.name AS channel_name
      FROM article a
      LEFT JOIN channel c ON a.channel_id = c.id
      WHERE (? IS NULL OR c.name = ?)
    `, [channel_name || null, channel_name || null]);
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

//根据id获取文章信息
router.get("/backend/articleget/:id", async (req, res) => {
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
        image_type: result[0].image_type,
        image_url: result[0].image_url
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//根据id修改文章信息
router.put("/backend/articleput/:id", async (req, res) => {
  try {
    const { title, content, channel, image_type, image_url } = req.body;
    if (!title || !content || !channel) {
      return res.status(400).json({
        success: false,
        message: "缺少必填字段",
      });
    }
    const { id } = req.params;
    // 查询channel_id
    const [channelRows] = await pool.query(
      "SELECT id FROM channel WHERE name = ?", // 改为查询channel表
      [channel]
    );
    if (channelRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "频道不存在",
      });
    }
    const channel_id = channelRows[0].id;
    //确定修改时间
    const edit_date = dayjs().format('YYYY/MM/DD HH:mm:ss');
    //针对id进行更新
    console.log("put", title, content, channel_id, image_type, image_url, id);
    const [result] = await pool.query(
      "update article set title = ?, content = ?, channel_id = ?, image_type = ?, image_url = ?, edit_date = ? where id = ?",
      [title, content, channel_id, image_type, image_url, edit_date, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "未找到对应文章",
      });
    }

    res.json({
      data: {
        success: true,
        message: "更新成功",
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
