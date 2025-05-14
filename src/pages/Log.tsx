import {LogTester, LogViewer, LogLoadTest} from "@/components";

import {PageContainer} from "@ant-design/pro-components";
import {Card, Col, Row} from "antd";

export default function (){
  return (
    <PageContainer>
      <Row>
        <Col span={6}>
          <Card>
            <LogTester/>
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <LogViewer/>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <LogLoadTest/>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
