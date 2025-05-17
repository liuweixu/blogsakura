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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RichTextEditor from "@/ui-backend/components/Editor";
import { useEffect, useState } from "react";
import {
  addArticleAPI,
  editArticleAPI,
  getArticleById,
  getChannelAPI,
} from "@/ui-backend/apis/article";
import { toast } from "sonner";
import type { ChannelItem } from "@/ui-backend/interface/Publish";
import { useSearchParams } from "react-router-dom";

import { Header } from "@/ui-backend/components/Header";

export function PublishArticle() {
  const form = useForm({
    defaultValues: {
      title: "",
      richtext: "",
      channel: "", // 添加初始空值
    },
  });
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data);
    };
    getChannelList();
  }, []);

  //TODO 查询id是否存在-》即是否需要编辑文章
  //回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  //获取实例
  useEffect(() => {
    /** TODO 关键修改点：
      1. 添加了channelList加载完成的检查
      2. 确保channel_name在channelList中存在
      3. 添加了channelList作为依赖项
      4. 添加了数据有效性检查
      这样修改后，当刷新页面时，会等待channelList加载完成后再尝试回填数据。
    **/
    async function getArticleDetail() {
      if (articleId && channelList.length > 0) {
        // 确保channelList已加载
        const res = await getArticleById(articleId.toString());
        if (res.data) {
          form.reset({
            title: res.data.title,
            richtext: res.data.content,
            channel: res.data.channel_name,
          });
          // 确保channel_name在channelList中存在
          const channelExists = channelList.some(
            (c) => c.name === res.data.channel_name
          );
          if (channelExists) {
            form.setValue("channel", res.data.channel_name);
          }
          form.setValue("richtext", res.data.content);
        }
      }
    }
    getArticleDetail();
  }, [articleId, form, channelList]); // 添加channelList依赖

  return (
    <Form {...form}>
      <Header href="/backend/home" title="首页" pagename="发布文章"></Header>
      <div className="w-2/3 space-y-6">
        <form
          onSubmit={form.handleSubmit(async (formValues: FieldValues) => {
            const { title, richtext, channel } = formValues;
            const pushData = {
              title: title,
              content: richtext,
              channel: channel,
            };
            //调用接口提交
            const res = articleId
              ? await editArticleAPI(articleId, pushData)
              : await addArticleAPI(pushData);
            if (res?.data.success) {
              if (articleId) {
                toast.success("成功", {
                  description: "修改文章成功",
                  action: {
                    label: "关闭",
                    onClick: () => console.log("Undo"),
                  },
                });
              } else {
                toast.success("成功", {
                  description: "插入文章成功",
                  action: {
                    label: "关闭",
                    onClick: () => console.log("Undo"),
                  },
                });
              }
            } else {
              toast.error("失败", {
                description: "插入文章失败",
                action: {
                  label: "关闭",
                  onClick: () => console.log("Undo"),
                },
              });
            }
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
                value={form.watch("channel")}
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
                value={form.watch("richtext")} //TODO 这里触发回填
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
