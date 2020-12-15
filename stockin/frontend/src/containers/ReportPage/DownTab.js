import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Menu, Header } from 'semantic-ui-react';
import { getDownStockInfo, getDownNews, getDownStockHistory } from '../../store/stock/stock';
import { renderReportBlock } from './index';

const DownTab = (props) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('1');
  const [reportBlock, setReportBlock] = useState([]);
  const [realRenderBlock, setRealRenderBlock] = useState([]);
  const { down } = useSelector((state) => state.stock);

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
    dispatch(getDownStockInfo());
    dispatch(getDownNews());
    dispatch(getDownStockHistory());
  }, []);

  useEffect(() => {
    setReportBlock(renderReportBlock(down, 'down'));
  }, [down]);

  useEffect(() => {
    let start_idx = (activeItem - 1) * 10;
    setRealRenderBlock(reportBlock.slice(start_idx, start_idx + 10));
  }, [activeItem, reportBlock]);

  return (
    <div className="DownTab" data-testid="DownTab">
      <Header id='TabExplain' as='h4' content='순위는 100위까지 제공됩니다.'/>
      <Segment>
        {realRenderBlock}
        <Menu pagination>{RenderMenuItem(1, 10)}</Menu>
      </Segment>
    </div>
  );
};

export default DownTab;
