import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getArticleListAPI } from "@/ui-backend/apis/article";
import { useEffect, useState } from "react";
import type { ArticleItem } from "@/ui-backend/interface/Article";

import { FcFullTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";

import { delArticleAPI } from "@/ui-backend/apis/article";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

import { usePagination } from "@/ui-backend/components/Pagination";

export function Article() {
  //必须要有接口，否则下面的invoices进行map时候，很容易出现错误提示
  const [invoices, setInvoices] = useState<ArticleItem[]>([]);
  //导航
  const navigator = useNavigate();
  //计算得到文章列表的总数
  const [count, setCount] = useState(0);
  //使用分页组件
  const { pagination, itemPerPage, currentPage } = usePagination(count);
  //渲染页面的时候，获取文章列表
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListAPI();
      setInvoices(res.data);
      setCount(res.data.length);
    };
    getArticleList();
  }, []);

  //计算当前页显示的文章
  const currentItems = invoices.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  //删除文章事件
  const handlerDeleteArticle = async (id: string) => {
    console.log(id);
    await delArticleAPI(id);
    // 很关键，涉及到界面的再次渲染
    const res = await getArticleListAPI();
    setInvoices(res.data);
    setCount(res.data.length);
  };

  //对AlertDialog组件的封装
  const renderAlertDialog = (id: string) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <FcFullTrash>
            <Button>删除</Button>
          </FcFullTrash>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作不可逆，请谨慎操作。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => handlerDeleteArticle(id)}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div>
      <div className="flex mb-5">
        <Breadcrumb className="flex items-center whitespace-nowrap overflow-hidden">
          <BreadcrumbList className="flex flex-nowrap">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/home">首页</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>文章列表</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-5">{`文章总数：${count}`}</div>
      <Card>
        <Table className="min-h-[300px] text-lg">
          <TableCaption>文章列表</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">标题</TableHead>
              <TableHead className="w-[500px]">频道</TableHead>
              <TableHead className="w-[600px]">频道ID</TableHead>
              <TableHead>
                <div className="flex justify-center">操作</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/**TODO 关键 ，能够实现分页机制的关键：让currentItems替代invoices */}
            {currentItems.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell>{invoice.channel_name}</TableCell>
                <TableCell>{invoice.channel_id}</TableCell>
                <TableCell>
                  {
                    <div className="flex justify-center">
                      <FcEditImage
                        className="mr-5"
                        onClick={() => {
                          navigator(`/backend/publish?id=${invoice.id}`);
                        }}
                      />
                      {renderAlertDialog(invoice.id)}
                    </div>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/**关键操作，让分页居中 使用 colSpan={3} 让分页组件横跨所有列 添加 className="text-center" 使内容居中*/}
              <TableCell colSpan={4} className="text-center">
                {pagination}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
}
