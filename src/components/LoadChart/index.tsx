import { Pie } from '@ant-design/charts';
import { Gauge } from '@ant-design/charts';

export const LoadChartGauge = ({name=""}) => {
  const config = {
    width: 240,
    height: 240,
    paddingBottom: 0,
    marginBottom:0,
    insetBottom: 30,
    autoFit: true,
    data: {
      target: 16,
      total: 100,
      name: 'score',
    },
    legend: false,
    annotations: [
      {
        type: 'text',
        style: {
          text: name,
          x: '50%',
          y: '80%',
          textAlign: 'center',
          fontSize: 20,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Gauge {...config} />;
};

const LoadChartPie = ({data = {}, name = ""}) => {
  const config = {
    data: data,
    angleField: 'value',
    autoFit: true,
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 0,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: name,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 20,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Pie {...config} />;
};
export default LoadChartPie;