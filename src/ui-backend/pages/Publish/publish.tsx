/**
 * 发布文章
 * 需要有上传表单
 * 要有上传文章封面 目测用单图和无图即可，其中无图可以用随机图片
 * 必须有文章标题和类别
 * 使用富文本插件，由于react版本为19，与react-quill不兼容，使用react-quill-new
 * 参考链接
 * https://www.npmjs.com/package/react-quill-new
 */

"use client";

// import RichTextEditor from "@/ui-backend/components/Editor";
import { useEffect, useState } from "react";
import {
  getArticleById,
  getChannelAPI,
  addArticleAPI,
} from "@/ui-backend/apis/article";

import type { ChannelItem } from "@/ui-backend/interface/Publish";
import { useSearchParams } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

import { Button, Form, Input, Select, Space, Breadcrumb, Radio, Upload } from 'antd';
import ReactQuill from 'react-quill-new';
import './index.css';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function PublishArticle() {
  // const form = useForm({
  //   defaultValues: {
  //     title: "",
  //     richtext: "",
  //     channel: "", // 添加初始空值
  //   },
  // });

  const [form] = Form.useForm();

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
          form.setFieldsValue({
            title: res.data.title,
            richtext: res.data.content,
            channel: res.data.channel_name,
          });
          // 确保channel_name在channelList中存在
          const channelExists = channelList.some(
            (c) => c.name === res.data.channel_name
          );
          if (channelExists) {
            form.setFieldValue("channel", res.data.channel_name);
          }
          form.setFieldValue("richtext", res.data.content);
        }
      }
    }
    getArticleDetail();
  }, [articleId, form, channelList]); // 添加channelList依赖

  //提交数据
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
    const { title, channel, content } = values;
    const reqData = {
      title,
      content,
      channel
    }
    addArticleAPI(reqData);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 800, marginLeft: 0 }}>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: '首页',
            href: '/backend/home',
          },
          {
            title: '文章发布',
            href: '/backend/publish',
          },
        ]}
        style={{ marginBottom: '36px' }}
      />
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="channel" label="类别" rules={[{ required: true }]}>
          <Select allowClear placeholder="请选择文章类别">
            {channelList.map((channel) => (
              <Option key={channel.id} value={channel.name}>
                {channel.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: false }]}>
          <ReactQuill
            theme="snow"
            className="publish-quill"
            value={form.getFieldValue("richtext") || ""}
            onChange={value => form.setFieldValue("richtext", value)}
          />
        </Form.Item>
        <Form.Item label="封面">
          <Form.Item name="type">
            <Radio.Group>
              <Radio value={1}>单图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          {
            /**
             * listType: 决定选择文件框的外观样式
             * showUploadList: 是否展示已上传文件列表
             */
          }
          <Upload
            listType="picture-card"
            showUploadList
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>

  );
}
