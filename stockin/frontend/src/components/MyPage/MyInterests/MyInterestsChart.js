import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

const MyInterestsChart = (props) => {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    if (props.data) {
      const dataStyle = {
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
      };
      for (let i = 0; i < props.data.length; i += 1) {
        api.get('stocks/financialstats/score/' + props.data[i].id + '/').then((response) => {
          setGraphData({ ...graphData, labels: [...graphData.labels, props.data[i].title] });
          if (response.data.score)
            setGraphData({
              ...graphData,
              datasets: [
                ...graphData.datasets,
                {
                  ...dataStyle,
                  label: props.data[i].title,
                  data: [{ x: response.data.score, y: props.data[i].score - 50 }],
                },
              ],
            });
        });
      }
    }
  }, []);

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
          //console.log(tooltipItem);
          console.log(data.datasets[tooltipItem.datasetIndex]);
          return data.datasets[tooltipItem.datasetIndex].label; //+'\n'+'profitability: ';
        },
      },
    },
  };
  console.log(graphData);
  return <Scatter data={graphData} options={options} />;
};

export default MyInterestsChart;
