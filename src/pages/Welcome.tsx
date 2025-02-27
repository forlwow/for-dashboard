import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Divider } from 'antd';
import { Col, Row, } from 'antd';
import { LoadChartGauge, SysDescribe } from '@/components';
import ContainerCard from '@/components/Container/ContainerCard';
import {LineChart} from '@/components';
import React, { useState, useEffect } from 'react';
import {fetchServerInfo} from "@/components";

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

  const [data, setData] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchServerInfo()
        const mapData = new Map<string, string>(
          Object.entries(result).map(([key, value]) => [key, String(value)])
        );
        setData(mapData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
        fetchData();
  }, []);

  return (
    <PageContainer>
      <ContainerCard initialState={initialState}>
        <Row style={{padding: 0}}>
          <Col span={6}><LoadChartGauge name='CPU' /></Col>
          <Col span={6}><LoadChartGauge name='Memory'/></Col>
          <Col span={6}><LoadChartGauge name='Network'/></Col>
          <Col span={6}><LoadChartGauge name='Disk'/></Col>
        </Row>
      </ContainerCard>
      <Divider />
      <ContainerCard initialState={initialState}>
        <Row>
          <LineChart data={lineData}/>
        </Row>
      </ContainerCard>
      <Divider/>
      <ContainerCard initialState={initialState}>
        <SysDescribe item={data}/>
      </ContainerCard>
    </PageContainer>
  );
};

export default Welcome;
