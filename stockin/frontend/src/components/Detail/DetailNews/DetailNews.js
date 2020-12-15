import React from 'react';
import { Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import NewsDatePicker from './NewsDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DetailNews.css';

const RenderCardItem = (item) => (
  <Card
    className="newsCard"
    key={item.title}
    href={item.link}
    header={item.title}
    meta={item.press}
  />
);

const DetailNews = (props) => {
  const { news } = useSelector((state) => state.news);

  return (
    <div id="DetailNews" data-testid="DetailNews">
      <NewsDatePicker id={props.id} />
      <div className="newsCount">검색 결과 : {news.length}개</div>
      {/* <List divided>{news.map((e) => RenderListItem(e))}</List> */}
      <Card.Group centered itemsPerRow={2}>
        {news.map((e) => RenderCardItem(e))}
      </Card.Group>
    </div>
  );
};

export default DetailNews;
