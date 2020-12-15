import React from 'react';
import './CustomToolTip.css';

const CustomToolTip = (props) => {
  let date = '';
  let endPrice = 0;
  let tradeVolume = 0;

  if(props.payload === null) {
    return <div className="CustomToolTip" data-testid="CustomToolTip"></div>;
  }
  // console.log(props);
  if(props.active) {
    date = props.payload[0].payload.date;
    endPrice = props.payload[0].payload.endPrice;
    endPrice = endPrice ? props.payload[0].payload.endPrice.toLocaleString('en-us') : '0';
    tradeVolume = props.payload[0].payload.tradeVolume;
    tradeVolume = tradeVolume ? tradeVolume.toLocaleString('en-us') : '-';
  }

  return (
    <div className="CustomToolTip" data-testid="CustomToolTip">
      <p style={props.isUp ? {color : 'red'} : {color : 'blue'}}>{date}</p>
      <p id='endprice'>종가 : {endPrice}원</p>
      <p id='tradevolume'>거래량 : {tradeVolume}주</p>
    </div>
  );
}

export default CustomToolTip;
