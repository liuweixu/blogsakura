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

import { getArticleListAPI } from "@/ui-backend/apis/article";
import { useEffect, useState } from "react";
import type { ArticleItem } from "@/ui-backend/interface/Article";

//必须要有接口，否则下面的invoices进行map时候，很容易出现错误提示

export function Article() {
  const [invoices, setInvoices] = useState<ArticleItem[]>([]);
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListAPI();
      setInvoices(res.data);
    };
    getArticleList();
  }, []);
  return (
    <Table>
      <TableCaption>文章列表</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">标题</TableHead>
          <TableHead>频道</TableHead>
          <TableHead>频道ID</TableHead>
          {/* <TableHead className="text-right">操作</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.title}</TableCell>
            <TableCell>{invoice.channel_name}</TableCell>
            <TableCell>{invoice.channel_id}</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
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
        </TableRow>
      </TableFooter>
    </Table>
  );
}
