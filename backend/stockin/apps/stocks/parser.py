import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock.settings')
import django
django.setup()
from .models import Stock, StockHistory

import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
from multiprocessing import Pool, Process

from selenium import webdriver

import re

from django import db




def initialStockAdd():
    driver = webdriver.PhantomJS('./phantomjs-2.1.1-linux-x86_64/bin/phantomjs')
    driver.implicitly_wait(3)

    code_title = pd.read_excel('stock-Excel/KOSPI.xls')[['종목코드', '기업명']]
    code_title.종목코드 = code_title.종목코드.map('{:06d}'.format)
    
    for stock in code_title.iloc:
        code = str(stock['종목코드'])
        title = str(stock['기업명'])
        try:
            Stock.objects.get(code=code)
        except:
            driver.get('https://stockplus.com/m/stocks/KOREA-A'+code)
            time.sleep(2)
            sector=driver.find_element_by_css_selector('.ftHiLowB.pt0').find_elements_by_tag_name('tr')[5].find_element_by_tag_name('td').text
            Stock(title = title, code=code, sector=sector, isKOSPI=True).save()
            Stock(title=title,code=code).save()
        
    
    code_title = pd.read_excel('stock-Excel/KOSDAQ.xls')[['종목코드', '기업명']]
    code_title.종목코드 = code_title.종목코드.map('{:06d}'.format)

    for stock in code_title.iloc:
        code = str(stock['종목코드'])
        title = str(stock['기업명'])
        try:
            Stock.objects.get(code=code)
        except:
            driver.get('https://stockplus.com/m/stocks/KOREA-A'+code)
            time.sleep(3)
            sector=driver.find_element_by_css_selector('.ftHiLowB.pt0').find_elements_by_tag_name('tr')[5].find_element_by_tag_name('td').text
            Stock(title = title, code=code, sector=sector, isKOSPI=False).save()
            Stock(title=title,code=code).save()
    


   


def stockUpdate_(stock):
    
    url = 'http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code=' + str(stock.code)
    html = requests.get(url).content
    soup = BeautifulSoup(html, 'html.parser')

    stockinfo = soup.select('TBL_StockInfo')[0]
    price = stockinfo['curjuka'].replace(',','')
    highestPrice = stockinfo['highjuka'].replace(',','')
    lowestPrice = stockinfo['lowjuka'].replace(',','')
    tradeVolume = stockinfo['volume'].replace(',','')
    tradeValue = stockinfo['money'].replace(',','')

    print("info : ",stock.title,' ', price," ",highestPrice," ",lowestPrice," ",tradeVolume," ",tradeValue)

    stock.price = price
    stock.highestPrice = highestPrice
    stock.lowestPrice = lowestPrice
    stock.tradeVolume = tradeVolume
    stock.tradeValue = tradeValue
    stock.save()



def stockUpdate(process=32):
    # start = time.time()

    stocks = Stock.objects.all()
   
    
    pool = Pool(process)
    
    for stock in stocks:
        pool.apply_async(stockUpdate_, args=(stock,))

    pool.close()
    pool.join()


    # print('time: ' , time.time()-start)


def beforeMarketUpdate(stock):
    price = stock.price
    stock.highestPrice = price
    stock.lowestPrice = price


def beforeMarket(process=32):
    stocks = Stock.objects.all()
    pool = Pool(process)
    


def pastStockHistory_(stock):

    count = 2500
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    url = 'https://fchart.stock.naver.com/sise.nhn?symbol={}&timeframe=day&count={}&requestType=0'.format(stock.code, count)
    rs = requests.get(url, headers= headers).content
    soup = BeautifulSoup(rs, 'html.parser')
    datas = soup.select('item')

    for data in datas:
        info = data['data'].split('|')
        date = info[0]
        date = date[0:4]+'-'+date[4:6]+'-'+date[6:]
        startPrice = info[1]
        high = info[2]
        low = info[3]
        endPrice = info[4]
        tradeVolume = info[5]
        upDown = int(endPrice) - int(startPrice)

        print(stock.title,' ',date)
        StockHistory.objects.create(
            stock=stock,
            date=date,
            startPrice=startPrice,
            endPrice=endPrice,
            highestPrice=high,
            lowestPrice=low,
            tradeVolume=tradeVolume,
            upDown=upDown
        )


def pastStockHistory(process=32):
    stocks = Stock.objects.all()
   
    
    # pool = Pool(16)
    
    # for stock in stocks:
    #     pool.apply_async(stockHistory, args=(stock,))

    #pool.map(stockHistory, stocks)

    # pool.close()
    # pool.join()

    for stock in stocks:
        pastStockHistory(stock)

        

    


if __name__ == '__main__':
    # driver = webdriver.PhantomJS('./phantomjs-2.1.1-linux-x86_64/bin/phantomjs')
    # driver.implicitly_wait(3)
    # driver.get('https://stockplus.com/m/stocks/KOREA-A035420')
    # time.sleep(3)
    # a=driver.find_element_by_css_selector('.ftHiLowB.pt0').find_elements_by_tag_name('tr')[5].find_element_by_tag_name('td').text
    # print(a)



    # start = time.time()
    # initialStockAdd()
    # print('time: ' , time.time()-start)

    # start = time.time()
    # stockHistoryUpdate()
    # print('time: ' , time.time()-start, ' 초')



    # s = Stock.objects.get(title='힘스')
    # stockHistory(s)
    pass