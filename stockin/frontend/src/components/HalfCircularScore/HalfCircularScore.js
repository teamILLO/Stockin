import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './HalfCircularScore.css';

const HalfCircularScore = (props) => {
  return (
    <div className="HalfCircularScore">
      <CircularProgressbar
        value={props.score}
        maxValue={props.maxScore}
        text={`${props.score}`}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
        })}
      />
    </div>
  );
};

export default HalfCircularScore;
