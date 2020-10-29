import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import './CircularPercentage.css';

const CircularPercentage = (props) => {
  return (
    <div className="CircularPercentage">
      <CircularProgressbar value={props.percentage * 100} text={`${props.percentage * 100}%`} />
    </div>
  );
};

export default CircularPercentage;
