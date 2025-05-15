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
import { useEffect, useState } from "react";
import { createArticleAPI, getChannelAPI } from "@/backend/apis/article";

//Todo 往后准备提取到公共组件
interface ChannelItem {
  id: number;
  name: string;
}

export function Publish() {
  const form = useForm();
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
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
      <div className="w-2/3 space-y-6">
        <form
          onSubmit={form.handleSubmit((formValues: FieldValues) => {
            const { title, richtext, channel } = formValues;
            console.log(typeof title, typeof richtext, typeof channel);
            //按照接口文档填写
            const pushData = {
              title: title,
              content: richtext,
              cover: {
                type: "0",
                images: [],
              },
              channel_id: channel,
            };
            //调用接口提交
            createArticleAPI(pushData);
          })}
        >
          <FormItem>
            <FormLabel>标题</FormLabel>
            <FormControl>
              <Input
                id="title"
                placeholder="请输入文章标题"
                {...form.register("title")}
                className="w-1/2"
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
                <SelectTrigger id="channel" className="w-1/2   relative z-50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="relative z-50">
                  {channelList.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription></FormDescription>
            <FormLabel>内容</FormLabel>
            <FormControl>
              <RichTextEditor
                onChange={(value) => form.setValue("richtext", value)}
              />
            </FormControl>
            <FormDescription></FormDescription>
          </FormItem>
          <Button type="submit">提交</Button>
        </form>
      </div>
    </Form>
  );
}
