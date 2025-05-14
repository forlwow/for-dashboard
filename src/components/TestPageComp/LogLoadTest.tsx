import React, { useState } from 'react';
import { Button, InputNumber, Form, Card, message } from 'antd';
import {BASE_URL, API} from "@/components/API/config";

const LogStressTest: React.FC = () => {
  const [logCount, setLogCount] = useState<number|null>(1000);
  const [response, setResponse] = useState<string>('');

  const sendLogRequest = async () => {
    try {
      const res = await fetch(BASE_URL+'/'+API.load_server_log, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ count: logCount }),
      });

      const text = await res.text();
      setResponse((prev) => prev + `\n[日志请求] ${text}`);
    } catch (err) {
      message.error('发送日志请求失败');
    }
  };

  const fetchLogResult = async () => {
    try {
      const res = await fetch(BASE_URL+'/'+API.get_load_server_log);
      const text = await res.text();
      setResponse((prev) => prev + `\n[获取结果] ${text}`);
    } catch (err) {
      message.error('获取日志结果失败');
    }
  };

  return (
    <Card title="日志压力测试工具" style={{ maxWidth: 600, margin: '20px auto' }}>
      <Form layout="vertical">
        <Form.Item label="输出日志条数">
          <InputNumber min={1} max={1000000} value={logCount} onChange={setLogCount} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={sendLogRequest} style={{ marginRight: 10 }}>
            发送日志
          </Button>
          <Button onClick={fetchLogResult}>获取结果</Button>
        </Form.Item>

        <Form.Item label="服务器响应">
          <pre style={{ background: '#f5f5f5', padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
            {response}
          </pre>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LogStressTest;
