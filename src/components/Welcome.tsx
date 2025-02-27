import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col, Row, theme } from 'antd';
import React from 'react';
import { LoadChartPie, SysDescribe } from '@/components'
import { LoadChartGauge } from '@/components'
import { Divider } from 'antd';
import { LineChart } from '@/components';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const cata = '1';
const cata2 = '150';

const lineData = [
  { year: '1991', value: 3, categlory: cata },
  { year: '1992', value: 4, categlory: cata },
  { year: '1993', value: 3.5, categlory: cata },
  { year: '1994', value: 5, categlory: cata },
  { year: '1995', value: 4.9, categlory: cata },
  { year: '1996', value: 6, categlory: cata },
  { year: '1997', value: 7, categlory: cata },
  { year: '1998', value: 9, categlory: cata },
  { year: '1999', value: 13, categlory: cata },

  { year: '1991', value: 2, categlory: cata2 },
  { year: '1992', value: 5, categlory: cata2 },
  { year: '1993', value: 6, categlory: cata2 },
  { year: '1994', value: 5, categlory: cata2 },
  { year: '1995', value: 8, categlory: cata2 },
  { year: '1996', value: 7, categlory: cata2 },
  { year: '1997', value: 8, categlory: cata2 },
  { year: '1998', value: 11, categlory: cata2 },
  { year: '1999', value: 15, categlory: cata2 },
];

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <Row style={{padding: 0}}>
          <Col span={6}><LoadChartGauge name='CPU' /></Col>
          <Col span={6}><LoadChartGauge name='Memory'/></Col>
          <Col span={6}><LoadChartGauge name='Network'/></Col>
          <Col span={6}><LoadChartGauge name='Disk'/></Col>
        </Row>

      </Card>
      <Divider style={{margin: 5}} />
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <Row>
          <LineChart data={lineData}/>
        </Row>
      </Card>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <SysDescribe/>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
