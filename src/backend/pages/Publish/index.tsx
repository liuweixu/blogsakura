"use client";

import { useForm, type FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RichTextEditor from "@/backend/components/Editor";

export function Publish() {
  const form = useForm();

  return (
    <Form {...form}>
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
      <form
        className="w-2/5 space-y-6"
        onSubmit={form.handleSubmit((formValues: FieldValues) => {
          console.log(formValues);
        })}
      >
        <FormItem>
          <FormLabel>标题</FormLabel>
          <FormControl>
            <Input
              id="title"
              placeholder="请输入文章标题"
              {...form.register("title")}
            />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
          <FormLabel>频道</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                form.setValue("channel", value);
              }}
              defaultValue={form.watch("channel")}
            >
              <SelectTrigger id="channel" className="w-1/1 relative z-50">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper" className="relative z-50">
                <SelectItem value="js">JS</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription></FormDescription>
          <FormLabel>内容</FormLabel>
          <FormControl>
            <RichTextEditor />
          </FormControl>
          <FormDescription></FormDescription>
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
