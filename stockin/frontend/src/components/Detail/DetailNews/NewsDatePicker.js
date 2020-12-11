import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { getNews } from '../../../store/news/news';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import './DetailNews.css';

/*
  For number padding
 */
function numberPad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

/*
  Set include date range
  startDate : Date
  n : int, Number of days to include from startDate        
*/
function setDateRange(startDate, n) {
  var li = [];
  for (var i = -1 * n; i < 1; i++) {
    li.push(addDays(startDate, i));
  }
  return li;
}

/*
  Parsing url & get stock ID 
  Return value : -1 : invalid url      
*/
function getStockId() {
  var a = window.location.pathname.substr(1).split('/');
  var b = -1;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === 'detail') {
      b = a[i + 1];
      break;
    }
  }
  return b;
}

const NewsDatePicker = (props) => {
  var curDate = new Date(Date.now());
  // const timeoutRef = React.useRef();
  const dispatch = useDispatch();
  // const { news } = useSelector((state) => state.news);
  const [startDate, setStartDate] = useState(curDate);
  var validDate = setDateRange(curDate, 30);
  const dateFormat =
    startDate.getFullYear() +
    numberPad(startDate.getMonth() + 1, 2) +
    numberPad(startDate.getDate(), 2);

  React.useEffect(() => {
    var stock_id = getStockId();
    // console.log(stock_id);
    if (stock_id !== -1) {
      dispatch(getNews(stock_id, dateFormat));
    }
  }, [dateFormat, dispatch, props.id]);

  const CustomInput = ({ value, onClick }) => (
    <div className="newsHeader">
      <h3 className="newsDate">{value} </h3>
      <Button
        className="newsPickButton"
        onClick={onClick}
        circular
        size="large"
        icon="calendar alternate outline"
      />
    </div>
  );

  return (
    <div data-testid="datepicker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        includeDates={validDate}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default NewsDatePicker;
