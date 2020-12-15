import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Menu, Header } from 'semantic-ui-react';
import { getUpStockInfo, getUpNews, getUpStockHistory } from '../../store/stock/stock';
import { renderReportBlock } from './index';

import './Tab.css';

const UpTab = (props) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('1');
  const [reportBlock, setReportBlock] = useState([]);
  const [realRenderBlock, setRealRenderBlock] = useState([]);
  const { up } = useSelector((state) => state.stock);

  /**
   * for pagnation
   */
  const RenderMenuItem = (start, end) => {
    let response = [];

    for (let i = start; i <= end; i++) {
      response.push(
        <Menu.Item
          data-testid={'menuItem' + i}
          key={i + ''}
          name={i + ''}
          active={activeItem === i + ''}
          onClick={() => setActiveItem(i + '')}
        />,
      );
    }
    return response;
  };

  useEffect(() => {
    dispatch(getUpStockInfo());
    dispatch(getUpNews());
    dispatch(getUpStockHistory());
  }, []);

  useEffect(() => {
    setReportBlock(renderReportBlock(up, 'up'));
  }, [up]);

  useEffect(() => {
    let start_idx = (activeItem - 1) * 10;
    setRealRenderBlock(reportBlock.slice(start_idx, start_idx + 10));
  }, [activeItem, reportBlock]);

  return (
    <div className="UpTab" data-testid="UpTab">
      <Header id='TabExplain' as='h4' content='순위는 100위까지 제공됩니다.'/>
      <Segment>
        {realRenderBlock}
        <Menu pagination>{RenderMenuItem(1, 10)}</Menu>
      </Segment>
    </div>
  );
};

export default UpTab;
