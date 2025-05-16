import express from "express";
import pool from "../../../utils/mysql-pool.js";
import cors from "cors";

const router = express.Router();
router.use(cors());
// 必须添加中间件解析请求体
router.use(express.json());
//查数据
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from test");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//查数据，查看手机号对应的code是否正确
router.post("/users", async (req, res) => {
  const formData = req.body;
  const phone = formData["mobile"];
  const code = formData["code"];
  console.log("Received data:", phone, code); // 调试输出接收到的数据
  // 测试模式：直接返回接收到的数据
  res.json({
    code: 200,
    msg: "测试模式",
    receivedData: {
      mobile: phone,
      code: code,
    },
  });
});

export default router;
