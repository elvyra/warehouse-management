import React from "react";
import { color } from "../interfaces/interfaces";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type PropsType = {
  title: string;
  subtitle: string;
  data: Array<number>;
  xAxisTitle: string;
  xAxisCategories: Array<string>;
  yAxisTitle: string;
  yAxisUnits: string;
};

const Highchart: React.FC<PropsType> = ({
  title,
  subtitle,
  data,
  xAxisTitle,
  xAxisCategories,
  yAxisTitle,
  yAxisUnits,
}: PropsType) => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      title: {
        text: xAxisTitle,
      },
      categories: xAxisCategories,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
      labels: {
        format: `{value} ${yAxisUnits}`,
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: title,
        data: [
          ...data.slice(0, data.length - 1),
          {
            y: data[data.length - 1],
            marker: {
              fillColor: color.current,
              radius: 5,
            },
          },
        ],
        color: color.primary,
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Highchart;
