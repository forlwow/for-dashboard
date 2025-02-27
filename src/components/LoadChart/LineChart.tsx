import { Line } from '@ant-design/plots';

export const LineChart = ({data = {}}) => {
      const config = {
        data,
        xField: 'year',
        yField: 'value',
        sizeField: 'value',
        colorField: 'categlory',
        animate: true,
        tooltip: { 
            title: 'year', 
            items: [{ field: 'value' }], 
          } ,
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