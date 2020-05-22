import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type PropsType = {
  title: string;
  data: Array<number>;
};

const Highchart: React.FC<PropsType> = ({ title, data }: PropsType) => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: title,
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Highchart;
