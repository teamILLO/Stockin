'''
stocks
'''
from datetime import timedelta

import json

from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone

from core.models import Stock, StockHistory, FinancialStat, News
from core.views.index import get_fs_info, get_top_rank_info, get_bottom_rank_info


def stock_fs(request, stock_id=''):
    '''
    stock_fs
    '''
    if request.method == 'GET':
        # For debugging
        # print(FinancialStat.objects.all().explain())
        # print(FinancialStat.objects.filter(stock__id = stock_id).explain())

        response_list = []
        fs_list = FinancialStat.objects.filter(stock__id = stock_id)

        for fs_ in fs_list:
            response_dict = {'id': fs_.id, 'stock_id': fs_.stock.id, 'quarter': fs_.quarter,
                            'sales': fs_.sales, 'operatingProfit': fs_.operatingProfit,
                            'netIncome': fs_.netIncome, 'operatingMargin': fs_.operatingMargin,
                            'netProfitMargin': fs_.netProfitMargin, 'PER': fs_.PER, 'PBR': fs_.PBR,
                            'ROE': fs_.ROE}
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])


def price_list(request, stock_id=""):
    '''
    price_list
    '''
    if request.method == 'GET':
        get_object_or_404(Stock, id=stock_id)
        response_list = []
        for stock_history in StockHistory.objects.filter(stock_id=stock_id).iterator():
            response_list.append({'stock': stock_id, 'date': stock_history.date,
                        'open': stock_history.startPrice, 'high': stock_history.highestPrice,
                        'low': stock_history.lowestPrice, 'close': stock_history.endPrice,
                        'volume': stock_history.tradeVolume})
        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])


def stock_list(request):
    '''
    stock_list
    '''
    if request.method == 'GET':
        # using cache
        # stock_qs = cache.get_or_set('stocks', Stock.objects.values('id','title','code','sector'))

        # original
        stock_qs = Stock.objects.values('id', 'title', 'code', 'sector')

        return JsonResponse(list(stock_qs), safe=False)


    return HttpResponseNotAllowed(['GET'])


def stock_info(request, stock_id=''):
    '''
    stock_info
    '''
    if request.method == 'GET':
        target_stock = Stock.objects.get(id = stock_id)
        kospi = 'KOSDAQ'
        if target_stock.isKOSPI:
            kospi = 'KOSPI'
        response_dict = {
                        'title' : target_stock.title,
                        'code' : target_stock.code,
                        'sector' : target_stock.sector,
                        'price' : target_stock.price,
                        'highestPrice' : target_stock.highestPrice,
                        'lowestPrice' : target_stock.lowestPrice,
                        'tradeVolume' : target_stock.tradeVolume,
                        'tradeValue' : target_stock.tradeValue,
                        'startPrice' : target_stock.startPrice,
                        'yesterdayPrice' : target_stock.yesterdayPrice,
                        'amount' : target_stock.amount,
                        'isKOSPI' : kospi,
                        'saleGrowthRate' : target_stock.saleGrowthRate,
                        'saleGrowthRateAvg' : target_stock.saleGrowthRateAvg,
                        'operatingMarginRate' : target_stock.operatingMarginRate,
                        'operatingMarginRateAvg' : target_stock.operatingMarginRateAvg,
                        'crawledPER' : target_stock.crawledPER,
                        'crawledPERAvg' : target_stock.crawledPERAvg,
                        'debtRatio' : target_stock.debtRatio,
                        'score' : target_stock.score
                        }
        return HttpResponse(content=json.dumps(response_dict), status=203)


    return HttpResponseNotAllowed(['GET'])


def fs_score(request, stock_id=""):
    '''
    fs_score
    '''
    if request.method == 'GET':
        stock = get_object_or_404(Stock, id=stock_id)
        fs_stock = FinancialStat.objects.filter(stock_id=stock_id)
        response = get_fs_info(stock, fs_stock)

        return JsonResponse(response, status=201)

    return HttpResponseNotAllowed(['GET'])


def stock_top10(request):
    '''
    stock_top10
    '''
    if request.method =='GET':
        stocks = get_top_rank_info(10)

        response_list=[]
        for stock in stocks:
            response_list.append({
                'id': stock['id'],
                'score':stock['score']
            })
        return JsonResponse(response_list, safe=False)

    return HttpResponseNotAllowed(['GET'])


def stock_bottom10(request):
    '''
    stock_bottom10
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_top_rank_info(10)

        for stock in stocks:
            response_list.append({
                'id': stock['id'],
                'score':stock['score']
            })
        return JsonResponse(response_list, safe=False)

    return HttpResponseNotAllowed(['GET'])


# For report page up tap
def stock_top100_stockinfo(request) :
    '''
    stock_top100_stockinfo
    '''
    if request.method =='GET':
        response_list = []
        stocks = get_top_rank_info(100)

        cnt = 1
        for stock in stocks:
            response_list.append({
                'id': stock['id'],
                'rank' : cnt,
                'title' : stock['title'],
                'isKOSPI' : stock['isKOSPI'],
                'code' : stock['code'],
                'price' : stock['price'],
                'yesterdayPrice' : stock['yesterdayPrice'],
                'score' : stock['score'],
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)

    return HttpResponseNotAllowed(['GET'])


def stock_top100_news(request) :
    '''
    stock_top100_news
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_top_rank_info(100)

        cnt = 1
        for stock in stocks:
            # Get News
            news_qs = News.objects.values('id', 'title',
                                    'press', 'link',
                                    'date').filter(stock__id = stock['id']).order_by('-date')[:5]
            news_list = []
            for news in news_qs:
                news_list.append(news)

            response_list.append({
                'id' : stock['id'],
                'news' : news_list,
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])

def stock_top100_stockhistory(request) :
    '''
    stock_top100_stockhistory
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_top_rank_info(100)

        enddate = timezone.now().date()
        startdate = enddate - timedelta(days=30)

        cnt = 1
        for stock in stocks:
            # Get StockHistory(1 month)
            stockhis_qs = StockHistory.objects.values('id', 'date','endPrice',
            'tradeVolume').filter(stock__id = stock['id']).filter(date__range=[startdate, enddate])
            stockhis_list = []
            for stockhis in stockhis_qs :
                stockhis_list.append(stockhis)

            response_list.append({
                'id' : stock['id'],
                'stockhistory' : stockhis_list,
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])


# For report page down tap
def stock_bottom100_stockinfo(request) :
    '''
    stock_bottom100_stockinfo
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_bottom_rank_info(100)

        # using cache
        # stock_qs = cache.get_or_set('down_stockinfo', Stock.objects.all().values('id',
        # 'title','isKOSPI','code','price','yesterdayPrice','fin_score').order_by('fin_score'))
        # stocks = stock_qs[0:100]

        # original
        # stocks=Stock.objects.all().values('id','title','isKOSPI',
        #                             'code','price','yesterdayPrice',
        #                             'fin_score').order_by('fin_score')[0:100]

        cnt = 1
        for stock in stocks:
            response_list.append({
                'id': stock['id'],
                'rank' : cnt,
                'title' : stock['title'],
                'isKOSPI' : stock['isKOSPI'],
                'code' : stock['code'],
                'price' : stock['price'],
                'yesterdayPrice' : stock['yesterdayPrice'],
                'score' : stock['score'],
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])

def stock_bottom100_news(request) :
    '''
    stock_bottom100_news
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_bottom_rank_info(100)

        # stocks=Stock.objects.all().values('id','fin_score').order_by('fin_score')[0:100]

        cnt = 1
        for stock in stocks:
            # Get News
            news_qs = News.objects.values('id', 'title','press', 'link',
                        'date').filter(stock__id = stock['id']).order_by('-date')[:5]
            news_list = []
            for news in news_qs[:5]:
                news_list.append(news)

            response_list.append({
                'id' : stock['id'],
                'news' : news_list,
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])

def stock_bottom100_stockhistory(request) :
    '''
    stock_bottom100_stockhistory
    '''
    if request.method =='GET':
        response_list=[]
        stocks = get_bottom_rank_info(100)

        enddate = timezone.now().date()
        startdate = enddate - timedelta(days=30)

        # stocks=Stock.objects.all().values('id','fin_score').order_by('fin_score')[0:100]

        cnt = 1
        for stock in stocks:
            # Get StockHistory(1 month)
            stockhis_qs = StockHistory.objects.values('id', 'date','endPrice','tradeVolume') \
                            .filter(stock__id = stock['id']) \
                            .filter(date__range=[startdate, enddate])
            stockhis_list = []
            for stockhis in stockhis_qs :
                stockhis_list.append(stockhis)

            response_list.append({
                'id' : stock['id'],
                'stockhistory' : stockhis_list,
            })
            cnt = cnt + 1

        return JsonResponse(response_list, safe=False)


    return HttpResponseNotAllowed(['GET'])
