import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Form, Radio, Select, Button, DatePicker, Popconfirm } from 'antd';
import { useEffect, useState } from "react";
import { getChannelAPI } from "@/ui-backend/apis/article";
import type { ChannelItem } from "@/ui-backend/interface/Publish";
// 引入汉化包 时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


const { Option } = Select;
const { RangePicker } = DatePicker;

export const Article = () => {
  //获取频道信息
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data);
    };
    getChannelList();
  }, []);

  // 列表头
  // 准备列数据
  // 定义状态枚举
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              // onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Breadcrumb
        separator='>'
        items={[
          {
            title: '首页',
            href: '/backend/home',
          },
          {
            title: '文章列表',
            href: '/backend/articlelist',
          },
        ]} />
      <Card style={{ marginTop: 20 }}>
        <Form initialValues={{ status: null }}>
          <Form.Item label='状态' name='status'>
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Form.Item label='频道' name='channel_id'>
          <Select placeholder='请选择文章频道' style={{ width: 120 }}>
            {channelList.map((channel) => (
              <Option key={channel.id} value={channel.name}>
                {channel.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='日期' name='date'>
          <RangePicker locale={locale}></RangePicker>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
            筛选
          </Button>
        </Form.Item>
      </Card>
      {/**表格区域 */}
      <Card style={{ marginTop: 20 }}>
        <Table rowKey="id" columns={columns} />
      </Card>
    </div>
  )
}



