import {Card} from 'antd';
import React from 'react';
import { InitialStateType } from '@@/plugin-initialState/@@initialState';

// 定义 Props 类型
interface ComponentProps {
  initialState: InitialStateType;  // 接收 initialState 参数
  children: React.ReactNode;
}

const ContainerCard: React.FC<ComponentProps> = ({ initialState, children = <></>,} ) => {
  return (
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
      {children}
    </Card>
  );
};

export default ContainerCard;
