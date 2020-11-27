# Crawler


## install requirements
```
(on your virtualenv)
$ pip3 install -r requirements.txt
```
초기 설치
<br/><br/>
## StockCrawler.py
```
python StockCrawler.py initial
```
stock/Stock model 주식종목 추가<br/>
처음 1번만 실행하면됨

<br/><br/>

```
python StockCrawler.py realtime
```
모든 stock/Stock model의 현시간 주가정보 업데이트
<br/><br/><br/>

```
python StockCrawler.py past (days)                 (ex> python StockCrawler.py past 100) 
```
모든 stock/Stock model의 과거 주가정보를 크롤링함 days는 오늘로부터 몇일치전꺼까지 가져올건지<br/>
days는 장개장일 기준이므로 1년은 대략 250 정도됨<br/>
**사용하기전 stock/StockHistory 모델 비우기** (속도향상 때문에 중복체크안함)<br/>

<br/><br/><br/>
## NewsCrawler.py
```
python NewsCrawler.py (startDate) (endDate)         (ex> python NewsCrawler.py 20201101 20201108)
```

<br/><br/>
## FSCrwaler.py
```
python FSCrwaler.py
```
Crawl the financial statements of all stocks and store them in the stock/FinancialStat model. If there are any duplicates, they are not collected automatically.
