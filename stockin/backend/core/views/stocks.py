# Create your views here.
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from json import JSONDecodeError
import json

from core.models import Stock, StockHistory, FinancialStat


def stock_fs(request, stock_id=''):
    if request.method == 'GET':
        
        # For debugging
        # print(FinancialStat.objects.all().explain())
        # print(FinancialStat.objects.filter(stock__id = stock_id).explain())

        response_list = []
        fs_list = FinancialStat.objects.filter(stock__id = stock_id)
        
        for fs in fs_list:
            response_dict = {'id': fs.id, 'stock_id': fs.stock.id, 'quarter': fs.quarter, 'sales': fs.sales, 'operatingProfit': fs.operatingProfit,
                             'netIncome': fs.netIncome, 'operatingMargin': fs.operatingMargin, 'netProfitMargin': fs.netProfitMargin, 'PER': fs.PER, 'PBR': fs.PBR, 'ROE': fs.ROE}
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)

    else:
        return HttpResponseNotAllowed(['GET'])


def price_list(request, stock_id=""):
    if request.method == 'GET':
        get_object_or_404(Stock, id=stock_id)
        response_list = []
        for stock_history in StockHistory.objects.filter(stock_id=stock_id).iterator():
            response_list.append({'stock': stock_id, 'date': stock_history.date, 'open': stock_history.startPrice, 'high': stock_history.highestPrice, 'low': stock_history.lowestPrice, 'close': stock_history.endPrice, 'volume': stock_history.tradeVolume})
        return JsonResponse(response_list, safe=False)
        
    else :
        return HttpResponseNotAllowed(['GET'])


def stock_list(request):
    if request.method == 'GET':
        response_list = []
        stocks = [stock for stock in Stock.objects.all()]
        for stock in stocks : 
            response_dict = {'id' : stock.id, 'title' : stock.title, 'code' : stock.code, 'sector' : stock.sector}
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)
    
    else :
        return HttpResponseNotAllowed(['GET'])


def stock_info(request, stock_id=''):
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
                        'score' : target_stock.score
                        }
        return HttpResponse(content=json.dumps(response_dict), status=203)
    
    else:
        return HttpResponseNotAllowed(['GET'])


def stock_top5(requset):
    if requset.method =='GET':
        stocks=Stock.objects.all().values_list('id','score').order_by('-score')[:5]
        response_list=[]
        for stock in stocks:
            response_list.append({
                'id': stock[0],
                'score':stock[1]
            })
        return JsonResponse(response_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


# n : loading 횟수 for scroll data fetching
def stock_get_10_each(requset, n=''):
    if requset.method =='GET':
        response_list=[]
        start_idx = n * 10
        end_idx = n * 10 + 9
        stock_end_idx = Stock.objects.count()-1

        if start_idx <= stock_end_idx and stock_end_idx <= end_idx :
            end_idx = stock_len

        if start_idx > stock_end_idx :
            return JsonResponse(response_list, safe=False)
        
        stocks=Stock.objects.all().values('id','title','isKOSPI','code','price','yesterdayPrice','score').order_by('-score')[start_idx : end_idx+1] #DB hit per request : caching?
        
        cnt = start_idx + 1
        for stock in stocks:
            response_list.append({
                'id': stock['id'],
                'rank' : cnt,
                'title' : stock['title'],
                'isKOSPI' : stock['isKOSPI'],
                'code' : stock['code'],
                'price' : stock['price'],
                'yesterdayPrice' : stock['yesterdayPrice'],
                'score':stock['score']
            })
            cnt = cnt + 1


        return JsonResponse(response_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])