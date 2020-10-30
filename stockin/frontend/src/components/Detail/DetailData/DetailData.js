import React from 'react';

const DetailData = (props) => {
  const onClickInterest = () => {};

  return (
    <div className="DetailData" data-testid="DetailData">
      <h1 className="detailName">{props.name}</h1>
      <h4 className="detailCode">{props.code}</h4>
      <button data-testid="detailInterest" onClick={() => onClickInterest()}>
        star
      </button>
      <div>detail graph</div>
    </div>
  );
};

export default DetailData;
