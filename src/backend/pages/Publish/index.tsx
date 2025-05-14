import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export const Publish = () => {
  return (
    <div className="flex">
      <Breadcrumb className="flex items-center whitespace-nowrap overflow-hidden">
        <BreadcrumbList className="flex flex-nowrap">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/home">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>发布文章</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
