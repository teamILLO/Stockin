import React from 'react';
//import PropTypes from "prop-types";

import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import { HoverTooltip } from 'react-stockcharts/lib/tooltip';
import './DetailData.css';

const DetailData = (props) => {
  const dateFormat = timeFormat('%Y-%m-%d');
  const numberFormat = format(',');
  const candlesAppearance = {
    wickStroke: '#000000',
    fill: function fill(d) {
      return d.close > d.open
        ? 'rgba(255, 8, 0, 0.8)'
        : d.close === d.open
        ? 'rgba(0,0,0,0.8)'
        : 'rgba(0, 8, 200, 0.8)';
    },
    stroke: '#000000',
    candleStrokeWidth: 0.05,
    widthRatio: 0.8,
    opacity: 1,
  };
  const tooltipContent = (ys) => {
    return ({ currentItem, xAccessor }) => {
      return {
        x: dateFormat(xAccessor(currentItem)),
        y: [
          {
            label: 'open',
            value: currentItem.open && numberFormat(currentItem.open),
          },
          {
            label: 'high',
            value: currentItem.high && numberFormat(currentItem.high),
          },
          {
            label: 'low',
            value: currentItem.low && numberFormat(currentItem.low),
          },
          {
            label: 'close',
            value: currentItem.close && numberFormat(currentItem.close),
          },
        ]
          .concat(
            ys.map((each) => ({
              label: each.label,
              value: each.value(currentItem),
              stroke: each.stroke,
            })),
          )
          .filter((line) => line.value),
      };
    };
  };
  const xAccessor = (d) => d.date;
  const xExtents = [xAccessor(last(props.data)), xAccessor(props.data[props.data.length - 100])];

  return (
    <div className="DetailData" data-testid="DetailData">
      <ChartCanvas
        className="chartCanvas"
        height={400}
        ratio={2}
        width={800}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={'svg'}
        seriesName="MSFT"
        data={props.data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries {...candlesAppearance} width={timeIntervalBarWidth(utcDay)} />
          <HoverTooltip tooltipContent={tooltipContent([])} fontSize={15} />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default DetailData;
