// 文章列表接口
export interface ArticleItem {
  id: string;
  title: string;
  content: string;
  channel_id: number;
  channel_name: string;
}

// 文章内容接口
export interface ArticleContent {
  title: string;
  content: string;
  channel_name: string;
}
