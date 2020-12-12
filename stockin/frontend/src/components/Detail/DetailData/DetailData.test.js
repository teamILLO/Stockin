import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailData from './DetailData';
import store from '../../../store/store';


describe('<DetailData />', () => {
  let detailData;
  let list = [];

  beforeAll(() => {
    let d = new Date(2020, 1, 1);
    for (let i = 0; i < 200; i = i + 1) {
      list.push({
        date: new Date(d.setDate(d.getDate() + i)),
        open: 2000 + i,
        high: 2500 + 2 * i,
        low: 1500 - 2 * i,
        close: 1800 - i,
      });
    }
    list.push({
        date: new Date(d.setDate(d.getDate() + 200)),
        open: 2000 + 200,
        high: 2500 + 100,
        low: 1500 - 2 * 100,
        close: 2200,
    })
    list.push({
      date: new Date(d.setDate(d.getDate() + 201)),
      open: 2000 + 200,
      high: 2500 + 100,
      low: 1500 - 2 * 100,
      close: 2200+20,
  })
  });

  beforeEach(() => {
    detailData = (
      <Provider store={store}>
        <DetailData data={list}/>
      </Provider>
    );
  });
  it('should render without errors', () => {
    render(detailData);
    const query = screen.queryAllByTestId('DetailData');
    expect(query.length).toBe(1);
  });

  it('should hover function', async() => {
    const sleep = seconds => new Promise(res => setTimeout(() => res(), seconds * 1000));
    
    const { container } = render(detailData);
    const query = screen.getByText("2040");
    fireEvent.mouseOver(query)
    const q =screen.getByTestId('DetailData')
    fireEvent.mouseMove(q)
    
    
    screen.debug()
   

    await sleep(2)
  });
});
