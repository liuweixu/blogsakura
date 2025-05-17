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

export function Article() {
  //必须要有接口，否则下面的invoices进行map时候，很容易出现错误提示
  const [invoices, setInvoices] = useState<ArticleItem[]>([]);
  //导航
  const navigator = useNavigate();
  //计算得到文章列表的总数
  const [count, setCount] = useState(0);
  //计算当前页数
  const [currentPage, setCurrentPage] = useState(1);
  // 预计每页显示的文章个数
  const itemPerPage = 5;

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
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                        }}
                      />
                    </PaginationItem>

                    {/* 总是显示第一页 */}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(1);
                        }}
                        isActive={1 === currentPage}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {/* 如果第一页和第二页之间有间隔，显示省略号 */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* 显示当前页附近的页码 */}
                    {Array.from({ length: Math.ceil(count / itemPerPage) })
                      .map((_, index) => index + 1)
                      .filter((page) => {
                        // 显示当前页附近的页码（前后各1页）
                        return (
                          page > 1 &&
                          page < Math.ceil(count / itemPerPage) &&
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {/* 如果最后一页和倒数第二页之间有间隔，显示省略号 */}
                    {currentPage < Math.ceil(count / itemPerPage) - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* 总是显示最后一页（如果总页数大于1） */}
                    {Math.ceil(count / itemPerPage) > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(Math.ceil(count / itemPerPage));
                          }}
                          isActive={
                            Math.ceil(count / itemPerPage) === currentPage
                          }
                        >
                          {Math.ceil(count / itemPerPage)}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(count / itemPerPage))
                          );
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
}
