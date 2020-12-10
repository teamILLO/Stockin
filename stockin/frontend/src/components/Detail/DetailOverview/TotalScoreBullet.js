import React from 'react';
import { ResponsiveBullet } from '@nivo/bullet';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const TotalScoreBullet = (props) => (
  <ResponsiveBullet
    rangeColors="pastel2"
    data={props.data}
    margin={{ top: 10, right: 90, bottom: 10, left: 90 }}
    spacing={46}
    titleAlign="start"
    titleOffsetX={-70}
    measureSize={0.2}
  />
);

export default TotalScoreBullet;
