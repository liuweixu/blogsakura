import express from "express";
import testRouter from "./test/test.js";
import loginRouter from "./express-backend/pages/Login/index.js";
import publishRouter from "./express-backend/pages/Publish/index.js";
import articleRouter from "./express-backend/pages/Article/index.js";

const app = express();

// 使用测试路由
app.use(testRouter);
app.use(loginRouter);
app.use(publishRouter);
app.use(articleRouter);

// 或者如果您想要添加前缀
// app.use("/api", testRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
