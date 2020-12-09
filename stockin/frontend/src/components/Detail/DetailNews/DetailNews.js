import React from 'react';
import { List, Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import NewsDatePicker from './NewsDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DetailNews.css';
/*
  List items rendering
*/
const RenderListItem = (item) => (
  <List.Item className="newsCard" key={item.id}>
    <List.Content as="a" href={item.link}>
      <List.Description>
        <br />
        <div className="newsTitle">{item.title}</div>
        <div className="newsPress">{item.press}</div>
        <br />
      </List.Description>
    </List.Content>
  </List.Item>
);

const RenderCardItem = (item) => (
  <Card className="newsCard" href={item.link} header={item.title} meta={item.press} />
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
