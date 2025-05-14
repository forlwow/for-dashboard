import {
  fetchServerInfo,
  fetchServerLoad,
  LineChart,
  LoadChartGauge,
  SysDescribe,
  trans2Map,
  transformBytes,
  transformServerLoad,
  useFetchData
} from '@/components';
import ContainerCard from '@/components/Container/ContainerCard';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {abs} from "stylis";


let date = new Date().toLocaleTimeString();
const cateRead = 'read';
const cateWrite = 'write';
const maxLen = 20;
const netDatas = [
  { time: date, value: 0, cate: cateWrite },
  { time: date, value: 0, cate: cateRead },
];

const fixPrecision = (num: number) => {
  return Math.round(num * 100) / 100;
};

const Welcome: React.FC = () => {
  const interval = 1000;
  const { initialState } = useModel('@@initialState');
  const { data: server_info } = useFetchData(fetchServerInfo, trans2Map);
  const { data: server_load_ } = useFetchData(fetchServerLoad, trans2Map, interval);

  const [cpu, setCpu] = useState<number>(0);
  const [mem, setMem] = useState<number>(0);
  const [netread, setNetRead] = useState<[number, number]>([0, 0]);
  const [netreadrate, setNetReadRate] = useState<number>(0);
  const [netwrite, setNetWrite] = useState<[number, number]>([0, 0]);
  const [netwriterate, setNetWriteRate] = useState<number>(0);
  const [diskTotal, setDiskTotal] = useState<[number, string]>([0, 'B']);
  const [diskAvailable, setDiskAvailable] = useState<[number, string]>([0, 'B']);

  useEffect(() => {
    const server_load = transformServerLoad(server_load_);
    if (server_load) {
      console.log(server_load)
      // Cpu, Mem
      setCpu(fixPrecision((server_load.get('cpu') as number) * 100));
      setMem(fixPrecision((server_load.get('mem') as number) * 100));
      // Net
      // setNet(transformBytes((server_load.get('net-w') ?? 0) + (server_load.get('net-r') ?? 0)))
      // let preread = netread[0] < netread[1] ? netread[1] : netread[0];
      let preread = netread[1];
      let prewrite = netwrite[1];
      let nr = (server_load.get('net-r') as number) ?? 0
      let nw = (server_load.get('net-w') as number) ?? 0
      setNetRead([preread, nr === 0 ? preread : nr]);
      setNetWrite([prewrite, nw ===0 ? prewrite : nw]);
      console.log(netread, netwrite)
      console.log(netread[1] - netread[0], netwrite[1] - netwrite[0])

      setNetReadRate(Math.floor((netread[1] - netread[0]) / (interval/1000) ));
      setNetWriteRate(Math.floor((netwrite[1] - netwrite[0]) / (interval/1000)));
      // setNetReadRate(fixPrecision((netread[1] - netread[0]) / interval));
      // setNetWriteRate(fixPrecision((netwrite[1] - netwrite[0]) / interval));
      let date = new Date().toLocaleTimeString();
      netDatas.push({ time: date, value: abs(Math.floor(netreadrate)), cate: cateRead });
      netDatas.push({ time: date, value: abs(Math.floor(netwriterate)), cate: cateWrite });
      if (netDatas.length > maxLen) {
        netDatas.shift();
        netDatas.shift();
      }

      setDiskTotal(transformBytes(server_load.get('disk-total') ?? 0));
      const disk_available =
        (server_load.get('disk-total') ?? 0) - (server_load.get('disk-free') ?? 0);
      setDiskAvailable(transformBytes(disk_available));
    }
  }, [server_load_]);

  return (
    <PageContainer>
      <ContainerCard initialState={initialState}>
        <Row style={{ padding: 0 }}>
          <Col span={6}>
            <LoadChartGauge name="CPU" cur={cpu} />
          </Col>
          <Col span={6}>
            <LoadChartGauge name="Memory" cur={mem} />
          </Col>
          <Col span={6}>
            <LoadChartGauge
              name={'Network ' + transformBytes(netreadrate + netwriterate)[1] + '/s'}
              cur={transformBytes(netreadrate + netwriterate)[0]}
              total={1024}
            />
          </Col>
          <Col span={6}>
            <LoadChartGauge
              name={'Disk ' + diskAvailable[1] + '/' + diskTotal[1]}
              cur={diskAvailable[0]}
              total={1000}
            />
          </Col>
        </Row>
      </ContainerCard>
      <Divider />
      <ContainerCard initialState={initialState}>
        <Row>
          <LineChart data={netDatas} />
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
