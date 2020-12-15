import React from 'react';
import { ResponsiveBullet } from '@nivo/bullet';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const CustomMarker = ({ x, size, color, onMouseEnter, onMouseMove, onMouseLeave }) => (
  <g transform={`translate(${x},0)`}>
    <line
      x1={0}
      x2={0}
      y1={0}
      y2={size}
      stroke={color}
      strokeWidth={2}
      strokeDasharray="2,3"
      fill="none"
    />
    <path d="M 0 -1 L 1 0 L 0 1 L -1 0 Z" fill={color} />
    <path transform={`translate(0,${size})`} d="M0 -10 L 10 0 L 0 10 L -10 0 Z" fill={color} />
  </g>
);

const TotalScoreBullet = (props) => {
  return (
    <ResponsiveBullet
      rangeColors="reds"
      data={props.data}
      margin={{ top: 10, right: 90, bottom: 10, left: 90 }}
      spacing={46}
      titleAlign="start"
      titleOffsetX={-70}
      measureSize={0.2}
      isInteractive={false}
      markerComponent={CustomMarker}
    />
  );
};

export default TotalScoreBullet;
