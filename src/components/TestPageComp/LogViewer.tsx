import React, {useState} from 'react';
import {
  Form,
  Select,
  InputNumber,
  Checkbox,
  Button,
  Typography,
  Divider,
  message, Input, Tag,
} from 'antd';

import {BASE_URL, API} from "@/components/API/config";

const fixPrecision = (num: number) => {
  return Math.round(num * 100) / 100;
};

const {TextArea} = Input;
const {Title} = Typography;

const logFiles = [
  'system',
  'file'
]; // 可动态加载

const LogViewer: React.FC = () => {
  const [fileName, setFileName] = useState(logFiles[0]);
  const [lineStart, setLineStart] = useState<number>(0);
  const [fromTail, setFromTail] = useState(false);
  const [logContent, setLogContent] = useState({
    data: "",
    size: 0,
    lines: 0,
  });

  const flush = async () => {
    try {
      const res = await fetch(BASE_URL + '/' + API.flush_server_log, {
          method: 'POST',
          body: fileName,
        }
      )
      if (!res.ok) throw new Error('请求失败');
    } catch (err: any) {
      message.error('日志刷新失败: ' + err.message);
    }
  }

  const signs = ["B", "KB", "MB", "GB", "TB"]
  let i = 0
  let num = Number(logContent.size);
  let sign = signs[i];
  while (Math.floor(num / 1024) > 0){
    if (i + 1 === signs.length){
      break;
    }
    num = fixPrecision(num / 1024);
    ++i;
    sign = signs[i];
  }

  const fetchLogs = async () => {
    try {
      const res = await fetch(BASE_URL + '/' + API.get_server_log, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          file: fileName + '.txt',
          startLine: fromTail ? -1 : lineStart,
          count: 10,
        }),
      });

      if (!res.ok) throw new Error('请求失败');
      const text = await res.json();
      setLogContent(text);
    } catch (err: any) {
      message.error('日志加载失败: ' + err.message);
    }
  };

  // @ts-ignore
  return (
    <div style={{maxWidth: 800, margin: '0 auto', padding: '2rem'}}>
      <Title level={3}>日志文件查看器</Title>
      <Form layout="vertical" onFinish={fetchLogs}>
        <Form.Item label="日志文件名">
          <Select
            defaultValue={fileName}
            // placeholder="选择日志文件"
            value={fileName}
            onChange={setFileName}
          >
            {logFiles.map((f) => (
              <Select.Option key={f} value={f}>
                {f}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="从末尾读取最新 10 行">
          <Checkbox
            checked={fromTail}
            onChange={(e) => setFromTail(e.target.checked)}
          >
            启用
          </Checkbox>
        </Form.Item>
        {!fromTail && (
          <Form.Item label="起始行号（从 0 开始）">
            <InputNumber
              min={0}
              value={lineStart}
              onChange={(val) => setLineStart(val || 0)}
            />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          加载日志
        </Button>
        <Button type="default" onClick={flush} style={{"margin": 5}}>
          刷新日志缓冲
        </Button>
      </Form>

      <Divider/>
      <Title level={4}>日志内容：</Title>
      <TextArea
        value={logContent.data}
        rows={12}
        readOnly
        style={{backgroundColor: '#f9f9f9'}}
      />
      <Tag>日志大小：{num}{sign}</Tag>
      <Tag>日志行数：{logContent.lines}</Tag>
    </div>
  );
};

export default LogViewer;
