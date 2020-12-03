import React from 'react';
import { Table, Popup, Icon } from 'semantic-ui-react';


/**
  Parsing url & get stock ID 
  Return value : -1 : invalid url      
*/
export const getStockId = () => {
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

/**
  List items rendering
*/
export const RenderTableItem = (item) => {
    var response = {};
  
    /* Header */
    const quarter = <Table.HeaderCell key={item.id}><div>{item.quarter}<br/>IFRS 연결</div></Table.HeaderCell>;
  
    /* Body */
    const sales = <Table.Cell key={item.id}>{item.sales}</Table.Cell>;
    const operatingProfit = <Table.Cell key={item.id}>{item.operatingProfit}</Table.Cell>;
    const netIncome = <Table.Cell key={item.id}>{item.netIncome}</Table.Cell>;
    const operatingMargin = <Table.Cell key={item.id}>{item.operatingMargin}</Table.Cell>;
    const netProfitMargin = <Table.Cell key={item.id}>{item.netProfitMargin}</Table.Cell>;
    const PER = <Table.Cell key={item.id}>{item.PER}</Table.Cell>;
    const PBR = <Table.Cell key={item.id}>{item.PBR}</Table.Cell>;
    const ROE = <Table.Cell key={item.id}>{item.ROE}</Table.Cell>;
  
    response = {
      ...response,
      quarter: quarter,
      sales: sales,
      operatingProfit: operatingProfit,
      netIncome: netIncome,
      operatingMargin: operatingMargin,
      netProfitMargin: netProfitMargin,
      PER: PER,
      PBR: PBR,
      ROE: ROE,
    };
    return response;
};

/**
  Rendering popup items
*/
export const RenderPopUpItems = (name) => {

  let items = {};

  items.sales = 
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>매출액(sales, sales volume)</h4>
      영업활동을 통해 얻은 총 수익을 말합니다.<br/><br/>
      예) 1000원짜리 물건을 100개 팔면,<br/>
      매출액 = 1000원 * 100 = 100,000원이 됩니다.
    </Popup>

  items.operatingProfit =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>영업이익(operating profit)</h4>
      영업활동을 통해 순수하게 남은 이익을 말합니다.<br/>
      매출액에서 매출원가와 판관비를 차감하고 남은 금액입니다.<br/><br/>
      예) 매출액이 10만원, 원가가 4만원, 판관비가 3만원일때,<br/>
      영업이익 = 10만원 - 4만원 - 3만원 = 3만원이 됩니다.<br/><br/>
      매출액 : 영업활동을 통해 얻은 총 수익<br/>
      매출원가 : 기업이 상품을 제조하는데 들인 원가<br/>
      판관비 : 판매비와 관리비를 합친 용어
    </Popup>

  items.netIncome =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>당기순이익(net income)</h4>
      영업이익에서 영업 외 수익을 더하고 영업 외 손실과 법인세 비용을 차감하고 남은 금액을 말합니다.<br/>
      당기순이익 = (영업이익 + 영업 외 수익) - (영업 외 손실 + 법인세 비용)<br/><br/>
      영업이익 : 영업활동을 통해 순수하게 남은 이익<br/>
      영업 외 수익 : 기업의 주된 영업활동이 아닌 활동으로부터 발생한 수익과 차익<br/>
      영업 외 손실 : 기업의 주된 영업활동 이외에서 발생한 비용<br/>
      법인세 비용 : 회계기간에 기업이 납부해야할 법인세(기업의 세금)를 말한다.
    </Popup>   

  items.operatingMargin =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>영업이익률(operating margin)</h4>
      매출에 대한 영업이익의 비율을 말합니다.<br/>
      영업이익률 = (영업이익 / 매출액) * 100(%)<br/><br/>
      예) 매출액이 10만원, 영업이익이 5만원일 때,<br/> 
      영업이익률 = (2만원/10만원) * 2 = 20%
    </Popup>  
  items.netProfitMargin =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>순이익률(net profit margin)</h4>
      당기순이익을 매출액으로 나눈 것으로, 최종적으로 주주에게 남겨진 이익이 얼마인지를 나타냅니다.<br/>
      순이익률 = 당기순이익 / 매출액 * 100(%)<br/><br/>
      매출액 : 영업활동을 통해 얻은 총 수익<br/>
      당기순이익 : 영업이익에서 영업 외 수익을 더하고 영업 외 손실과 법인세 비용을 차감하고 남은 금액<br/>
    </Popup> 

  items.PER =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>PER(주가수익비율, price earning ratio)</h4>
      현재 주가를 주당순이익으로 나눈 값을 말합니다.<br/>
      PER = 현재 주가 / 주당순이익(EPS)<br/>
      주당순이익(earning per share) : 당기순이익을 주식수로 나눈 값<br/>
      share : stock 과 동일한 용어, 주식수<br/>
    </Popup> 

  items.PBR =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>PBR(주가순자산비율, price to book-value ratio)</h4>
      주가를 주당순자산가치(BPS)로 나눈 비율을 말합니다.<br/>
      PBR = 주가 / 주당순자산가치 = 시가총액 / 순자산<br/><br/>
      주당순자산가치(book value per share) : 순자산 / 총 발행주식수<br/>
      share : stock 과 동일한 용어, 주식수<br/>
      순자산 : 자산에서 부채를 뺀 잔액
    </Popup>  

  items.ROE =
    <Popup 
      trigger={<Icon name='question circle outline' />} 
      wide
    >
      <h4>ROE(자기자본이익률, return on equity)</h4>
      기업이 자기자본(주주지분)을 활용해 1년간 얼마를 벌어들였는가를 말합니다.<br/>
      ROE ＝ 당기순이익 / 평균 자기자본 * 100 (%)<br/><br/>
      당기순이익 : 영업이익에서 영업 외 수익을 더하고 영업 외 손실과 법인세 비용을 차감하고 남은 금액<br/>
      평균 자기자본 : 일정기간동안 자기자본의 평균<br/>
      자기자본 : 기업의 총자산에서 부채를 제외한 나머지 자산<br/>
      총자산 : 기업의 자본과 부채를 합한 값<br/>
    </Popup>

  /* Error handling */
  if(!(name in items)) {
    return <Popup content='null' trigger={<Icon icon='add' />} />;
  }

  return items[name];
}