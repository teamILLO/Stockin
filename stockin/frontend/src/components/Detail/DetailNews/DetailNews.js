import React from 'react';
import { List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import NewsDatePicker from './NewsDatePicker';

import 'react-datepicker/dist/react-datepicker.css';

/*
  List items rendering
*/
const RenderListItem = (item) => (
  <List.Item key={item.id}>
    <List.Content as="a" href={item.link}>
      {/* <List.Header as="a" href={item.link}>
        {item.title}
      </List.Header> */}
      <List.Description>
        <div>{item.title}</div>
        <div>{item.press}</div>
      </List.Description>
    </List.Content>
  </List.Item>
);

const DetailNews = (props) => {
  const { news } = useSelector((state) => state.news);

  return (
    <div id="DetailNews" data-testid="DetailNews">
      <NewsDatePicker id={props.id} />
      <List divided>{news.map((e) => RenderListItem(e))}</List>
    </div>
  );
};

export default DetailNews;
