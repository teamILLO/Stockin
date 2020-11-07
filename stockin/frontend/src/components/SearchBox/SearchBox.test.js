import React from 'react';
import {
  render,
  screen,
  fireEvent,
  getByText,
  queryAllByTestId,
  getByPlaceholderText,
} from '@testing-library/react';
import SearchBox from './SearchBox';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { Container, Menu, Button, Image, Visibility } from 'semantic-ui-react';
import { head } from 'lodash';

describe('<SearchBox />', () => {
  let searchbox;
  beforeEach(() => {
    searchbox = (
      <Provider store={store}>
        <SearchBox/>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle value change', () => {
    const utils = render(searchbox);
    const input = document.body.querySelector('.prompt');
    fireEvent.change(input, { target: { value: 'foo' } })
    expect(input.value).toBe('foo') 
    fireEvent.change(input, { target: { value: '' } })
    console.log(input.value);
    expect(input.value).toBe('')
  });

  it('should represent correct ', () => {
    const utils = render(searchbox);
    const input = document.body.querySelector('.prompt');
    fireEvent.change(input, { target: { value: 'foo' } });
    expect(input.value).toBe('foo');
    const query = screen.queryAllByText(/No results found./i);
    expect(query.length).toBe(1);
  });


});