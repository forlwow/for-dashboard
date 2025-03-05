import {
  fetchServerInfo,
  fetchServerLoad,
  LineChart,
  LoadChartGauge,
  SysDescribe,
  trans2Map,
  transformBytes,
  transformServerLoad,
  useFetchData,
} from '@/components';
import ContainerCard from '@/components/Container/ContainerCard';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Divider, Row } from 'antd';
import React from 'react';

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

const fixPrecision = (num: number) => {
  return Math.round(num * 100) / 100;
};

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { data: server_info } = useFetchData(fetchServerInfo, trans2Map);
  const { data: server_load_ } = useFetchData(fetchServerLoad, trans2Map, 5000);
  const server_load = transformServerLoad(server_load_);
  const [netnum, netunit] = transformBytes(
    (server_load.get('net-w') ?? 0) + (server_load.get('net-r') ?? 0),
  );
  const disk_available = (server_load.get('disk_total') ?? 0) - (server_load.get('disk_free') ?? 0);
  const [disktotalnum, disktotalunit] = transformBytes(server_load.get('disk_total') ?? 0);
  const [diskavanum, diskavaunit] = transformBytes(disk_available);

  return (
    <PageContainer>
      <ContainerCard initialState={initialState}>
        <Row style={{ padding: 0 }}>
          <Col span={6}>
            <LoadChartGauge
              name="CPU"
              cur={fixPrecision((server_load.get('cpu') as number) * 100)}
            />
          </Col>
          <Col span={6}>
            <LoadChartGauge
              name="Memory"
              cur={fixPrecision((server_load.get('mem') as number) * 100)}
            />
          </Col>
          <Col span={6}>
            <LoadChartGauge name={'Network ' + netunit} cur={netnum} total={1024} />
          </Col>
          <Col span={6}>
            <LoadChartGauge
              name={'Disk ' + diskavaunit + '/' + disktotalunit}
              cur={diskavanum}
              total={disktotalnum}
            />
          </Col>
        </Row>
      </ContainerCard>
      <Divider />
      <ContainerCard initialState={initialState}>
        <Row>
          <LineChart data={lineData} />
        </Row>
      </ContainerCard>
      <Divider />
      <ContainerCard initialState={initialState}>
        <SysDescribe item={server_info} />
      </ContainerCard>
    </PageContainer>
  );
};

export default Welcome;
