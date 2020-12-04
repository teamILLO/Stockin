import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sticky, Menu, Input, Container } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StockReportBlock from '../../components/StockReportBlock/StockReportBlock';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import { getScrollData } from '../../store/stock/stock';

const ReportPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const { scrollData } = useSelector((state) => state.stock);
  const dispatch = useDispatch();
  const contextRef = createRef();
  const [active, setActive] = useState('up');
  const [renderReportBlock, setRenderReportBlock] = useState([]);

  const handleRenderReportBlock = (li) => {
    let result_list = []

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
      
    result_list = renderReportBlock.concat(result_list);
    setRenderReportBlock(result_list);
  };

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  useEffect(() => {
    dispatch(getScrollData('2'));
  }, [])

  useEffect(() => {
    handleRenderReportBlock(scrollData)
  }, [scrollData])

  return (
    <div className="ReportPage" data-testid="ReportPage" ref={contextRef}>
      <Header history={props.history} />
      <Container>
      <Sticky context={contextRef} offset={64.8}>
        <Menu attached="top" tabular style={{ backgroundColor: '#fff', paddingTop: '1em' }}>
          <Menu.Item as="a" active={active === 'up'} onClick={() => setActive('up')} name="up" data-testid="upTab"/>
          <Menu.Item as="a" active={active === 'down'} onClick={() => setActive('down')} name="down" data-testid="downTab"/>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder="Search users..."
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
