import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

const MyInterestsChart = (props) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: -50,
            max: 50,
            display: false,
          },
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'profitability',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            min: -8,
            max: 8,
            display: false,
          },
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'stability',
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'point',
      callbacks: {
        label: (tooltipItem, data) => {
          console.log(data.datasets[tooltipItem.datasetIndex]);
          return data.datasets[tooltipItem.datasetIndex].label;
        },
      },
    },
  };

  return (
    <div data-testid="MyInterestsChart">
      <Scatter data={props.data} options={options} />
      <br />
      <p style={{ color: 'lightgrey' }}>
        Stocks not assessable due to lack of data does not appear on the graph
      </p>
    </div>
  );
};

export default MyInterestsChart;
