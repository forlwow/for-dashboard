import React, { useState } from 'react';
import { Form, Input, Select, Button, Typography, Switch } from 'antd';
import {BASE_URL, API} from "@/components/API/config";

const { TextArea } = Input;
const { Title } = Typography;

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

const LogTester: React.FC = () => {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState('info');
  const [repeat, setRepeat] = useState(1);
  const [append, setAppend] = useState(true);
  const [responseText, setResponseText] = useState('');

  const sendLog = async () => {
    const targetUrl = BASE_URL+'/'+API.write_server_log;

    const body = JSON.stringify({ level, message: message, count:repeat});

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body,
      });
      const result = await res.text();
      setResponseText(result)
    } catch (e: any) {
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title level={3}>后台日志测试工具</Title>
      <Form layout="vertical" onFinish={sendLog}>
        <Form.Item label="日志内容">
          <TextArea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="请输入日志信息..." />
        </Form.Item>
        <Form.Item label="日志级别">
          <Select value={level} onChange={setLevel}>
            {LOG_LEVELS.map((lvl) => (
              <Select.Option key={lvl} value={lvl}>{lvl.toUpperCase()}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="重复次数">
          <Input
            type="number"
            min={1}
            max={100}
            value={repeat}
            onChange={(e) => setRepeat(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="响应追加模式">
          <Switch checked={append} onChange={setAppend} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">发送日志</Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: '2rem' }}>
        <Title level={4}>响应内容：</Title>
        <pre style={{
          background: '#f9f9f9',
          padding: '1rem',
          borderRadius: 6,
          maxHeight: 400,
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
        }}>
          {responseText}
        </pre>
      </div>
    </div>
  );
};

export default LogTester;
