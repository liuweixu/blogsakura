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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

import { getArticleListAPI } from "@/ui-backend/apis/article";
import { useEffect, useState } from "react";
import type { ArticleItem } from "@/ui-backend/interface/Article";

import { FcFullTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";

import { delArticleAPI } from "@/ui-backend/apis/article";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Article() {
  //必须要有接口，否则下面的invoices进行map时候，很容易出现错误提示
  const [invoices, setInvoices] = useState<ArticleItem[]>([]);

  const navigator = useNavigate();

  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListAPI();
      console.log(res.data);
      setInvoices(res.data);
    };
    getArticleList();
  }, []);
  return (
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
        {invoices.map((invoice) => (
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
                      navigator(`/publish?id=${invoice.id}`);
                    }}
                  />
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
                        <AlertDialogAction
                          onClick={async () => {
                            console.log(invoice.id);
                            await delArticleAPI(invoice.id);
                            // 很关键，涉及到界面的再次渲染
                            const res = await getArticleListAPI();
                            setInvoices(res.data);
                          }}
                        >
                          确认
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
