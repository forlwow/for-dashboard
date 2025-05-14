import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography } from 'antd';
import { BASE_URL, API} from "@/components/API/config";

const { TextArea } = Input;
const { Title } = Typography;

const RequestForm: React.FC = () => {
  const [protocol, setProtocol] = useState('http');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [path, setPath] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const url = `${protocol}://${host}:${port}${path}`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'text/plain',
        },
        ...(method === 'POST' && { body }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (err: any) {
      setResponse(`请求失败：${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
      <Title level={3}>服务器请求测试</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="协议">
          <Select value={protocol} onChange={setProtocol}>
            <Select.Option value="http">http</Select.Option>
            <Select.Option value="https">https</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="主机">
          <Input value={host} onChange={(e) => setHost(e.target.value)} placeholder="如 192.168.1.100" />
        </Form.Item>
        <Form.Item label="端口">
          <Input value={port} onChange={(e) => setPort(e.target.value)} placeholder="如 39000" />
        </Form.Item>
        <Form.Item label="路径">
          <Input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/ping 或 /api/test" />
        </Form.Item>
        <Form.Item label="方法">
          <Select value={method} onChange={setMethod}>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
          </Select>
        </Form.Item>
        {method === 'POST' && (
          <Form.Item label="请求体">
            <TextArea rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">发送请求</Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: '2rem' }}>
        <Title level={4}>响应结果：</Title>
        <pre style={{
          background: '#f6f8fa',
          padding: '1rem',
          borderRadius: 4,
          maxHeight: '300px',
          overflow: 'auto',
          fontFamily: 'monospace'
        }}>
          {response}
        </pre>
      </div>
    </div>
  );
};

export default RequestForm;
