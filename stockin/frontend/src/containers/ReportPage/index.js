import React from 'react';
import StockReportBlock from '../../components/StockReportBlock/StockReportBlock';

/**
 * Rendering report block
 */
export const renderReportBlock = (li, tab) => {
  let result_list = [];
  let stock_list = [];
  for (let i = 0; i < 100; i++) {
    stock_list.push({});
  }

  let stockinfo = li.stockinfo;
  let news = li.news;
  let stockhistory = li.stockhistory;

  if (stockinfo.length !== 0) {
    for (let i = 0; i < 100; i++) {
      stock_list[i] = {
        ...stock_list[i],
        id: stockinfo[i].id,
        rank: stockinfo[i].rank,
        title: stockinfo[i].title,
        isKOSPI: stockinfo[i].isKOSPI,
        code: stockinfo[i].code,
        price: stockinfo[i].price,
        yesterdayPrice: stockinfo[i].yesterdayPrice,
        score: stockinfo[i].score,
      };
    }
  }

  if (news.length !== 0) {
    for (let i = 0; i < 100; i++) {
      stock_list[i] = {
        ...stock_list[i],
        news: news[i].news,
      };
    }
  }

  if (stockhistory.length !== 0) {
    for (let i = 0; i < 100; i++) {
      stock_list[i] = {
        ...stock_list[i],
        stockhistory: stockhistory[i].stockhistory,
      };
    }
  }

  let cnt = 1;
  stock_list.forEach((stock) => {
    result_list.push(
      <div key={cnt}>
        <StockReportBlock
          data-testid="StockReportBlock"
          isUp={tab === 'up' ? true : false}
          id={stock.id}
          rank={stock.rank}
          title={stock.title}
          isKOSPI={stock.isKOSPI}
          code={stock.code}
          price={stock.price}
          yesterdayPrice={stock.yesterdayPrice}
          score={stock.score}
          news={stock.news}
          stockhistory={stock.stockhistory}
        />
      </div>,
    );
    cnt = cnt + 1;
  });
  return result_list;
};
