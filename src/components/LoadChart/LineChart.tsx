import { Line } from '@ant-design/plots';

export const LineChart = ({ data = {} }) => {
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    sizeField: 'value',
    colorField: 'cate',
    animate: true,
    tooltip: {
      title: 'time',
      items: [{ field: 'value' }],
    },
    point: {
      shapeField: 'circle',
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    legend: { size: false },
  };
  return <Line {...config} />;
};
