import {RequestForm, LoadTestForm} from '@/components';
import './TestPage.css';
import {PageContainer} from "@ant-design/pro-components";
import {Card, Col, Divider, Row} from "antd";
import React from "react";

function App() {
  return (
    <PageContainer>
        <Row>
          <Col span={10}>
            <Card>
            <RequestForm />
            </Card>
          </Col>
          <Col span={10}>
            <Card>
            <LoadTestForm />
            </Card>
          </Col>
        </Row>
    </PageContainer>
  );
}

export default App;
