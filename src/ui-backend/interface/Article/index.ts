// 文章列表接口
export interface ArticleItem {
  id: bigint;
  title: string;
  content: string;
  channel_id: number;
  channel_name: string;
}
