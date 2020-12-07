import React, { useState, useEffect, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sticky, Menu, Input, Container } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StockReportBlock from '../../components/StockReportBlock/StockReportBlock';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import { getScrollData } from '../../store/stock/stock';
import { updateIncrement } from '../../store/stock/increment';

const ReportPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const { scrollData } = useSelector((state) => state.stock);
  const { increment } = useSelector((state) => state.increment);
  const dispatch = useDispatch();
  const contextRef = createRef();
  const [active, setActive] = useState('up');
  const [renderReportBlock, setRenderReportBlock] = useState([]);
  const initCall = useRef(true);

  const infinityScroll = async () => {
    if(document.getElementsByClassName("ReportPage").length === 0) return;

    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight

    if(scrollTop + clientHeight === scrollHeight) {
      dispatch(updateIncrement());
    }
  };

  const handleRenderReportBlock = (li) => {
    let result_list = [];

    li.forEach((stock) => {
      result_list.push(
        <StockReportBlock 
          key={stock.id}
          id={stock.id}
          rank={stock.rank}
          title={stock.title}
          isKOSPI={stock.isKOSPI}
          code={stock.code}
          price={stock.price}
          yesterdayPrice={stock.yesterdayPrice}
          score={stock.score}
          rank={stock.id}
        />
      )
    });
    setRenderReportBlock(result_list);
  };

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  useEffect(() => {
    if(increment === 0) dispatch(getScrollData(increment));
    window.addEventListener('scroll', infinityScroll, true);
  }, []);

  useEffect(() => {
    if(initCall.current) {
      initCall.current = false;
    }
    else {
      dispatch(getScrollData(increment));
    }
  }, [increment]);

  useEffect(() => {
    handleRenderReportBlock(scrollData);
  }, [scrollData]);

  return (
    <div className="ReportPage" data-testid="ReportPage" ref={contextRef}>
      <Header history={props.history} />
      <Container>
      <Sticky context={contextRef} offset={64.8}>
        <Menu attached="top" tabular style={{ backgroundColor: '#fff', paddingTop: '1em' }}>
          <Menu.Item as="a" active={active === 'up'} onClick={() => setActive('up')} name="매수 추천" data-testid="upTab"/>
          <Menu.Item as="a" active={active === 'down'} onClick={() => setActive('down')} name="매도 추천" data-testid="downTab"/>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder="종목 검색"
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sticky>
      {renderReportBlock}
      </Container>
      <Footer history={props.history} />
    </div>
  );
};

export default ReportPage;