import os,sys, getopt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stockin.settings')
import django
django.setup()
from core.models import Stock, StockHistory, FinancialStat

import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
from multiprocessing import Pool, Process

from selenium import webdriver
from bs4 import BeautifulSoup

import re
import OpenDartReader

from django import db
import csv



#처음 엑셀 추출용
def initialStockAddFromExcel():
    # driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-linux-x86_64/bin/phantomjs'))
    driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-macosx/bin/phantomjs')) 
    
    driver.implicitly_wait(3)

    api_key = '365c9909f6ce1ba811ec45d3dc46cfc9853ce05f'
    dart = OpenDartReader(api_key) 

    f = open('stocks.csv','w', newline='')
    writer = csv.DictWriter(f, fieldnames = ['title','code','sector','isKOSPI', 'saleGrowthRate', 'saleGrowthRateAvg', 'operatingMarginRate', 'operatingMarginRateAvg', 'crawledPER', 'crawledPERAvg', 'debtRatio'])
    writer.writeheader()
    i = 0
    try:
        code_title = pd.read_excel(os.path.join(BASE_DIR,'core/crawlers/KOSPI.xls'))[['종목코드', '기업명']]
        code_title.종목코드 = code_title.종목코드.map('{:06d}'.format)
        
        for stock in code_title.iloc:
            code = str(stock['종목코드'])
            title = str(stock['기업명'])

            driver.get('https://stockplus.com/m/stocks/KOREA-A'+ code + '/analysis')
            time.sleep(1)            
            raw = driver.page_source
            soup = BeautifulSoup(raw, 'html.parser')
            print(i)
            i+=1

            try:
                finstate = dart.finstate(code, 2019)

                liabilities = finstate[finstate['account_nm'] == '부채총계']
                if len(liabilities) > 1 :
                    liabilities = liabilities[liabilities['fs_div'] == 'CFS']['thstrm_amount'].iloc[0].replace(",","")
                else:
                    liabilities = liabilities['thstrm_amount'].iloc[0].replace(",","")

                equality = finstate[finstate['account_nm'] == '자본총계']
                if len(equality) > 1 :
                    equality = equality[equality['fs_div'] == 'CFS']['thstrm_amount'].iloc[0].replace(",","")
                else:
                    equality = equality['thstrm_amount'].iloc[0].replace(",","")

                debtRatio = "%0.3f" % ((float(liabilities) / float(equality)) * 100)
                
            except:
                debtRatio = ''
               
            try:
                saleGrowthRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(1) > li > div > div.graph > span > em')
                operatingMarginRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(2) > li > div > div.graph > span > em')
                crawledPER = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(3) > li > div > div.graph > span > em')
                sector = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.titleB > em')
                sector = sector[0].get_text().replace('업종 : ', '')
                writer.writerow({'title': title, 'code': code, 'sector': sector, 'isKOSPI':True, 'saleGrowthRate': saleGrowthRate[0].get_text(), 'saleGrowthRateAvg': saleGrowthRate[1].get_text(), 'operatingMarginRate': operatingMarginRate[0].get_text(), 'operatingMarginRateAvg': operatingMarginRate[1].get_text(), 'crawledPER': crawledPER[0].get_text(), 'crawledPERAvg': crawledPER[1].get_text(), 'debtRatio': debtRatio})
            except:
                driver.get('https://stockplus.com/m/stocks/KOREA-A'+ code)
                time.sleep(1)
                sector=driver.find_element_by_css_selector('.ftHiLowB.pt0').find_elements_by_tag_name('tr')[5].find_element_by_tag_name('td').text
                writer.writerow({'title': title, 'code': code, 'sector': sector, 'isKOSPI':True, 'debtRatio': debtRatio})

        
        code_title = pd.read_excel(os.path.join(BASE_DIR,'core/crawlers/KOSDAQ.xls'))[['종목코드', '기업명']]
        code_title.종목코드 = code_title.종목코드.map('{:06d}'.format)

        for stock in code_title.iloc:
            code = str(stock['종목코드'])
            title = str(stock['기업명'])

            driver.get('https://stockplus.com/m/stocks/KOREA-A'+ code + '/analysis')
            time.sleep(1)
            raw = driver.page_source
            soup = BeautifulSoup(raw, 'html.parser')
            print(i)
            i+=1

            try:
                finstate = dart.finstate(code, 2019)

                liabilities = finstate[finstate['account_nm'] == '부채총계']
                if len(liabilities) > 1 :
                    liabilities = liabilities[liabilities['fs_div'] == 'CFS']['thstrm_amount'].iloc[0].replace(",","")
                else:
                    liabilities = liabilities['thstrm_amount'].iloc[0].replace(",","")
                    
                equality = finstate[finstate['account_nm'] == '자본총계']
                if len(equality) > 1 :
                    equality = equality[equality['fs_div'] == 'CFS']['thstrm_amount'].iloc[0].replace(",","")
                else:
                    equality = equality['thstrm_amount'].iloc[0].replace(",","")

                debtRatio = "%0.3f" % ((float(liabilities) / float(equality)) * 100)

            except:
                debtRatio = ''
               
            try:
                saleGrowthRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(1) > li > div > div.graph > span > em')
                operatingMarginRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(2) > li > div > div.graph > span > em')
                crawledPER = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(3) > li > div > div.graph > span > em')
                sector = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.titleB > em')
                sector = sector[0].get_text().replace('업종 : ', '')
                writer.writerow({'title': title, 'code': code, 'sector': sector, 'isKOSPI':False, 'saleGrowthRate': saleGrowthRate[0].get_text(), 'saleGrowthRateAvg': saleGrowthRate[1].get_text(), 'operatingMarginRate': operatingMarginRate[0].get_text(), 'operatingMarginRateAvg': operatingMarginRate[1].get_text(), 'crawledPER': crawledPER[0].get_text(), 'crawledPERAvg': crawledPER[1].get_text(), 'debtRatio': debtRatio})
            except:
                driver.get('https://stockplus.com/m/stocks/KOREA-A'+ code)
                time.sleep(1)
                sector=driver.find_element_by_css_selector('.ftHiLowB.pt0').find_elements_by_tag_name('tr')[5].find_element_by_tag_name('td').text
                writer.writerow({'title': title, 'code': code, 'sector': sector, 'isKOSPI':False, 'debtRatio': debtRatio})

    finally:
        driver.quit()
        f.close()
        print('crawling 종료')


# DB 첨 스타팅용~
def initialStockAdd():
    Stock.objects.all().delete()
    FinancialStat.objects.all().delete()

    print("insert Stock")

    stock_list=[]
    financial_list=[]
    with open('data/stocks.csv', 'r') as f:
        reader = csv.DictReader(f)
        for stock in reader:
            stock_list.append(Stock(
                title=stock['title'],
                code=stock['code'],
                sector=stock['sector'],
                isKOSPI=stock['isKOSPI'],
                saleGrowthRate=stock['saleGrowthRate'],
                saleGrowthRateAvg=stock['saleGrowthRateAvg'],
                operatingMarginRate=stock['operatingMarginRate'],
                operatingMarginRateAvg=stock['operatingMarginRateAvg'],
                crawledPER=stock['crawledPER'],
                crawledPERAvg=stock['crawledPERAvg'],
                debtRatio=stock['debtRatio']
            ))
    
    Stock.objects.bulk_create(stock_list)

    print("insert FinancialStat")

    with open('data/Financial_State.csv', 'r') as f:
        reader = csv.DictReader(f)
        
        for FS in reader:
            target_stock = Stock.objects.get(title=FS['stock'])
            financial_list.append(FinancialStat(
                stock=target_stock,
                quarter=FS['quarter'],
                sales=FS['sales'],
                operatingProfit=FS['operatingProfit'],
                netIncome=FS['netIncome'],
                operatingMargin=FS['operatingMargin'],
                netProfitMargin=FS['netProfitMargin'],
                PER=FS['PER'],
                PBR=FS['PBR'],
                ROE=FS['ROE']
            ))

    FinancialStat.objects.bulk_create(financial_list)
            
                        

# daily update scoring data
def scoringUpdate():
    Stock.objects.all().delete()

    driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-macosx/bin/phantomjs')) 
    driver.implicitly_wait(3)
    stock_list = []
    stock_list_csv = []
    with open('data/stocks.csv', 'r') as f:
        reader = csv.DictReader(f)
        for stock in reader:

            driver.get('https://stockplus.com/m/stocks/KOREA-A'+ stock['code'] + '/analysis')
            time.sleep(1)            
            raw = driver.page_source
            soup = BeautifulSoup(raw, 'html.parser')

            try:
                saleGrowthRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(1) > li > div > div.graph > span > em')
                operatingMarginRate = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(2) > li > div > div.graph > span > em')
                crawledPER = soup.select('body > div:nth-child(1) > div > div:nth-child(1) > main > article > div.contW02 > div.udGraphB > div > div > ul:nth-child(3) > li > div > div.graph > span > em')
                sgr = saleGrowthRate[0].get_text()
                sgrAvg = saleGrowthRate[1].get_text()
                omr = operatingMarginRate[0].get_text()
                omrAvg = operatingMarginRate[1].get_text()
                per = crawledPER[0].get_text()
                perAvg = crawledPER[1].get_text()
            except:
                sgr, sgrAvg, omr, omrAvg, per, perAvg = '', '', '', '', '', ''

            stock_list.append(Stock(
                title=stock['title'],
                code=stock['code'],
                sector=stock['sector'],
                isKOSPI=stock['isKOSPI'],
                saleGrowthRate=sgr,
                saleGrowthRateAvg=sgrAvg,
                operatingMarginRate=omr,
                operatingMarginRateAvg=omrAvg,
                crawledPER=per,
                crawledPERAvg=perAvg,
                debtRatio=stock['debtRatio']
            ))
            stock_list_csv.append({'title': stock['title'], 'code': stock['code'], 'sector': stock['sector'], 'isKOSPI': stock['isKOSPI'], 'saleGrowthRate': sgr, 'saleGrowthRateAvg': sgrAvg, 'operatingMarginRate': omr, 'operatingMarginRateAvg': operatingMarginRate[1].get_text(), 'crawledPER': per, 'crawledPERAvg': perAvg, 'debtRatio': stock['debtRatio']})

    Stock.objects.bulk_create(stock_list)
    f = open('stocks.csv','w', newline='')
    writer = csv.DictWriter(f, fieldnames = ['title','code','sector','isKOSPI', 'saleGrowthRate', 'saleGrowthRateAvg', 'operatingMarginRate', 'operatingMarginRateAvg', 'crawledPER', 'crawledPERAvg', 'debtRatio'])
    writer.writeheader()
    writer.writerows(stock_list_csv)
    f.close()
    
   


def stockUpdate_(stock):
   
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    url = 'http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code=' + str(stock.code)
    html = requests.get(url, headers= headers).content
    soup = BeautifulSoup(html, 'html.parser')

    stockinfo = soup.select('TBL_StockInfo')[0]
    price = stockinfo['curjuka'].replace(',','')
    highestPrice = stockinfo['highjuka'].replace(',','')
    lowestPrice = stockinfo['lowjuka'].replace(',','')
    tradeVolume = stockinfo['volume'].replace(',','')
    tradeValue = stockinfo['money'].replace(',','')
    yesterdayPrice = stockinfo['prevjuka'].replace(',','')

    print("info : ",stock.title,' ', price," ",highestPrice," ",lowestPrice," ",tradeVolume," ",tradeValue)

    stock.price = price
    stock.highestPrice = highestPrice
    stock.lowestPrice = lowestPrice
    stock.tradeVolume = tradeVolume
    stock.tradeValue = tradeValue
    stock.yesterdayPrice = yesterdayPrice
    stock.save()


# 실시간 주가 업데이트용
def stockUpdate(process=32):
    # start = time.time()

    stocks = Stock.objects.all()
   
    
    pool = Pool(process)
    
    for stock in stocks:
        pool.apply_async(stockUpdate_, args=(stock,))

    pool.close()
    pool.join()


    # print('time: ' , time.time()-start)


#손보는중
def beforeMarketUpdate(stock):
    price = stock.price
    stock.highestPrice = price
    stock.lowestPrice = price


def beforeMarket(process=32):
    stocks = Stock.objects.all()
    pool = Pool(process)
    


def pastStockHistory_(stock, count):

    count = count
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    url = 'https://fchart.stock.naver.com/sise.nhn?symbol={}&timeframe=day&count={}&requestType=0'.format(stock.code, count)
    rs = requests.get(url, headers= headers).content
    soup = BeautifulSoup(rs, 'html.parser')
    datas = soup.select('item')

    StockHistory_list=[]
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
        s = StockHistory(
            stock=stock,
            date=date,
            startPrice=startPrice,
            endPrice=endPrice,
            highestPrice=high,
            lowestPrice=low,
            tradeVolume=tradeVolume,
            upDown=upDown
        )
        StockHistory_list.append(s)

    StockHistory.objects.bulk_create(StockHistory_list)


# 과거 주가 기록 가져오는용
def pastStockHistory(count, process=32):
    stocks = Stock.objects.all()
    StockHistory.objects.delete()
    
    pool = Pool(process)

    try:
        for stock in stocks:
            pool.apply_async(pastStockHistory_, args=(stock, count))

   
    finally:
        pool.close()
        pool.join()

    # for stock in stocks:
    #     pastStockHistory(stock)

        

    
# 크롤링 실험해볼려면 아래에서

if __name__ == '__main__':
 

    # start = time.time()
    # initialStockAdd()
    # print('time: ' , time.time()-start)

    # start = time.time()
    # stockHistoryUpdate()
    # print('time: ' , time.time()-start, ' 초')



    # s = Stock.objects.get(title='힘스')
    # stockHistory(s)
    
    if sys.argv[1] == 'initial':
        print('initial stock-adding start!')
        initialStockAdd()
        print('finish!')
    
    elif sys.argv[1] == 'realtime':
        print('realtime stock update start!')
        stockUpdate()
        print('finish!')
        
    elif sys.argv[1] == 'past':
        count = int(sys.argv[2])
        print('past stock-info start!')
        pastStockHistory(count)
        print('finish!')

    elif sys.argv[1] == 'crawl':
        print('crawling start!')
        initialStockAddFromExcel()
        print('finish!')

    elif sys.argv[1] == 'scoring':
        print('crawling for scoring start!')
        scoringUpdate()
        print('finish!')
