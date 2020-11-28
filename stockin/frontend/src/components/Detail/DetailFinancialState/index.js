import React from 'react';
import { Table } from 'semantic-ui-react';

// QuarterTable.js, YearTable.js
/*
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

/*
  List items rendering
*/
export const RenderTableItem = (item) => {
    var response = {};
  
    /* Header */
    const quarter = <Table.HeaderCell key={item.id}>{item.quarter}</Table.HeaderCell>;
  
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