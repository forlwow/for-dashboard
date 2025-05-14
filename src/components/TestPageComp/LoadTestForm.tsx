import React, { useState } from 'react';
import './LoadTestForm.css';
import {BASE_URL, API} from "@/components/API/config";
import {Button, Form, Input, Typography} from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const LoadTestForm: React.FC = () => {
  const [target, setTarget] = useState('http://127.0.0.1:39000/ping');
  const [concurrency, setConcurrency] = useState<number>(5);
  const [duration, setDuration] = useState<number>(5);
  const [result, setResult] = useState('');

  const appendResult = (text: string) => {
    setResult(prev => prev + `\n${text}`);
  };
  const ResetResult = () => {
    setResult('');
  };


  const fetchResult = async () => {
    try{
      const res = await fetch(BASE_URL+"/"+API.get_server_load_test);
      const data = await res.text(); // 也可以是 JSON
      setResult(prev => prev + `\n[结果 - ${new Date().toLocaleTimeString()}]\n${data}`);
    }
    catch (err : any){
      appendResult(`[异常] 获取结果失败：${err.message}`);
    }
  };

  const startTest = async () => {
    try{
      const res = await fetch(BASE_URL+"/"+API.start_server_load_test, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ target, concurrency, duration }),
      });
      await res.json();
      setResult(prev => prev + `[开始测试]\n`);

      // 2. 等待 duration 后再请求结果
      setTimeout(async () => {
        await fetchResult();
      }, duration * 1000 + 500);


    }
    catch (err:any){
      appendResult(`[异常] 启动压测失败：${err.message}`);
    }
  };
  // @ts-ignore
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
      <Title level={3}>服务器压力测试</Title>
      <Form layout="vertical">
        <Form.Item label="目标地址">
          <Input value={target} onChange={e => setTarget(e.target.value)} />
        </Form.Item>
        <Form.Item label="并发数">
          <Input value={concurrency} onChange={e => setConcurrency(Number(e.target.value))} />
        </Form.Item>
        <Form.Item label="持续时间（秒）">
          <Input value={duration} onChange={e => setDuration(Number(e.target.value))} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={startTest}>开始压测</Button>
          <Button onClick={fetchResult} style={{ marginLeft: '10px' }}>重新获取结果</Button>
          <Button onClick={ResetResult} style={{ marginLeft: '10px' }}>清除结果</Button>
        </Form.Item>
        <Form.Item label="压测输出">
          <TextArea rows={10} value={result} readOnly />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoadTestForm;
