import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
//import PropTypes from "prop-types";

import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';

import { getStockHistory } from '../../../store/stockHistory';

const DetailData = (props) => {
  const onClickInterest = () => {};
  const { priceList } = useSelector((state) => state.stockHistory);
  const xAccessor = (d) => d.date;
  const xExtents = [xAccessor(last(priceList)), xAccessor(priceList[priceList.length - 100])];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockHistory(props.id));
  });

  return (
    <div className="DetailData" data-testid="DetailData">
      <Icon name="star outline" data-testid="detailInterest" onClick={() => onClickInterest()} />
      <ChartCanvas
        height={400}
        ratio={props.ratio}
        width={props.width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={'svg'}
        seriesName="MSFT"
        data={priceList}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

/*
DetailData.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

DetailData.defaultProps = {
	type: "svg",
};
*/
DetailData = fitWidth(DetailData);

export default DetailData;
