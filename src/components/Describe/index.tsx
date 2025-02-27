import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

interface DescribeProps{
  item: Map<string, string>;
};


const SysDescribe: React.FC<DescribeProps> = ({ item }) => {
  const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Name',
    children: item.get("name"),
  },
  {
    key: '2',
    label: 'Version',
    children: item.get('version'),
  },
  {
    key: '3',
    label: 'Kernel',
    children: item.get('kernel_version'),
  },
  {
    key: '4',
    label: 'System',
    children: item.get('system'),
  },
  {
    key: '5',
    label: 'Run Time',
    children: item.get('run_time'),
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: (item.get('status') === 'run') ? <Badge status="processing" text="running" /> : <Badge status='error' text='stop'/>,
    span: 3,
  },
  {
    key: '7',
    label: 'Start Time',
    children: item.get('start_time'),
  },
];
  return (
    <Descriptions title="System Info" bordered items={items} />
  );
};

export default SysDescribe;
