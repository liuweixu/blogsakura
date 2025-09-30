import express from "express";
import testRouterBackend from "./test/test.js";
import loginRouterBackend from "./express-backend/pages/Login/index.js";
import publishRouterBackend from "./express-backend/pages/Publish/index.js";
import articleRouterBackend from "./express-backend/pages/Article/index.js";
import homeRouter from "./express-frontend/pages/Home/index.js";
import articleRouter from "./express-frontend/pages/Article/index.js";
import cosupload from "./express-backend/pages/Upload/index.js";

const app = express();

// 使用测试路由
app.use(articleRouter);
app.use(testRouterBackend);
app.use(loginRouterBackend);
app.use(publishRouterBackend);
app.use(articleRouterBackend);
app.use(homeRouter);
app.use(cosupload);

// 或者如果您想要添加前缀
// app.use("/api", testRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
