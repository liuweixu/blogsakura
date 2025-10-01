import express from 'express';
import cors from 'cors';
import COSUpload from '../../../utils/cos.js';

// 创建路由对象
const router = express.Router();
// 允许跨域
router.use(cors());
// 必须添加中间件解析请求体
router.use(express.json());

console.log(COSUpload.COSConfig.SecretId, COSUpload.COSConfig.SecretKey, COSUpload.COSConfig.Bucket, COSUpload.COSConfig.Region, COSUpload.COSConfig.appId);
// 获取COS上传签名接口
router.get('/cos', (req, res) => {
  try {
    // 这里应该生成签名，但为了简化，直接返回配置
    // 在实际生产环境中，你需要使用腾讯云SDK生成安全的签名
    res.json({
      data: {
        secretId: COSUpload.COSConfig.SecretId,
        secretKey: COSUpload.COSConfig.SecretKey,
        bucket: COSUpload.COSConfig.Bucket,
        region: COSUpload.COSConfig.Region,
        appId: COSUpload.COSConfig.appId
      }
    });
  } catch (error) {
    res.status(500).json({ error: '生成签名失败' });
  }
});

export default router;