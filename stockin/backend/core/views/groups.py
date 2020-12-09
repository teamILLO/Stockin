from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from json import JSONDecodeError
import json, os, csv

from core.models import Group, Stock, FinancialStat
from core.crawlers.preprocessors.score import base_score
 
def group_list_and_create(request):
    if request.method == 'GET':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        response_list = []
        group_list = [group for group in Group.objects.all() if group.user == request.user]

        for group in group_list : 
            # Make stock list
            response_stock_list = []

            stock_list = [stock for stock in group.stocks.all()]
            
            for stock in stock_list :
                fs_stock = FinancialStat.objects.filter(stock_id=stock.id)
                op = ['','','','','']
                try:
                    op[4] = fs_stock.get(quarter='20년 6월').operatingProfit
                except ObjectDoesNotExist as e:
                    pass
                try:
                    op[3] = fs_stock.get(quarter='20년 3월').operatingProfit
                except ObjectDoesNotExist as e:
                    pass
                try:
                    op[2] = fs_stock.get(quarter='19년 12월').operatingProfit
                except ObjectDoesNotExist as e:
                    pass
                try:
                    op[1] = fs_stock.get(quarter='19년 6월').operatingProfit
                except ObjectDoesNotExist as e:
                    pass
                try:
                    op[0] = fs_stock.get(quarter='19년 3월').operatingProfit
                except ObjectDoesNotExist as e:
                    pass
                for i in range(5):
                    if op[i] == '-':
                        op[i] = ''
                # liability rate

                # operatingCashflow
                script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
                rel_path = "../crawlers/data/Cash_Flow.csv"
                abs_file_path = os.path.join(script_dir, rel_path)
                f = open(abs_file_path, 'r', encoding='utf-8')
                rdr = csv.reader(f)
                operatingCashflow = []
                for line in rdr:
                    if line[0] == stock.title and line[1] == '18년 12월':
                        if line[2] == ' ':
                            operatingCashflow.append('')
                        else:
                            operatingCashflow.append(float(str(line[2]).replace(',','')))
                    elif line[0] == stock.title and line[1] == '19년 12월':
                        if line[2] == ' ':
                            operatingCashflow.append('')
                        else:
                            operatingCashflow.append(float(str(line[2]).replace(',','')))
                        break
                f.close()  

                # response = {'score' : score, 'status': if score is None, operatingProfitNotEnough 1, operatingCashflowNotEnough 2, Both 3}
                fs_score = base_score(op, operatingCashflow, stock.debtRatio, stock.crawledPER, stock.crawledPERAvg, stock.operatingMarginRate, stock.operatingMarginRateAvg)
                stock_info_dict = {
                    'id' : stock.id,
                    'title' : stock.title,
                    'code' : stock.code,
                    'sector' : stock.sector,
                    'price' : stock.price,
                    'highestPrice' : stock.highestPrice,
                    'lowestPrice' : stock.lowestPrice,
                    'tradeVolume' : stock.tradeVolume,
                    'tradeValue' : stock.tradeValue,
                    'startPrice' : stock.startPrice,
                    'yesterdayPrice' : stock.yesterdayPrice,
                    'amount' : stock.amount,
                    'isKOSPI' : stock.isKOSPI,
                    'score' : stock.score,
                    'fs_score' : fs_score,
                }
                response_stock_list.append(stock_info_dict)

            response_dict = {
                'id' : group.id, 
                'user' : group.user.email, 
                'name' : group.name,
                'stocks' : response_stock_list,
            }
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)

    elif request.method == 'POST':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            user = request.user
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        group = Group(user=user, name=name)
        group.save()

        response_dict = {'id' : group.id, 'user': group.user.email, 'name' : group.name}
        return HttpResponse(content=json.dumps(response_dict), status = 201)
    
    else :
        return HttpResponseNotAllowed(['GET', 'POST'])


def group_edit(request, id='') :
    if request.method == 'PUT':
        # check user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=id)

        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)

        try : 
            body = request.body.decode()
            name = json.loads(body)['name']
            user = request.user
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        group.name = name
        group.save()

        response_dict = {'id' : group.id, 'user': group.user.email, 'name' : group.name}
        return HttpResponse(content=json.dumps(response_dict), status = 200)

    elif request.method == 'DELETE':
        # check user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=id)

        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)

        # TODO : Delete fail handle
        group.delete()

        return HttpResponse(status=200)

    else :
        return HttpResponseNotAllowed(['PUT', 'DELETE'])


def group_stock_list(request, id=''):
    if request.method == 'GET':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=id)
        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)

        response_list = []
        for stock in group.stocks.all():
            response_dict = {'id' : stock.id, 'title' : stock.title}
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)

    elif request.method == 'POST':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=id)
        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)

        try:
            body = request.body.decode()
            stock_id = json.loads(body)['id']
            user = request.user
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # find record in stock model
        try:
            target_stock = Stock.objects.get(id=stock_id)
        except Stock.DoesNotExist:
            return HttpResponseBadRequest()

        # if stock already exists, immediate return 204 'NO CONTENT'
        if group.stocks.filter(id=int(stock_id)) :
            return HttpResponse(status = 204)
        
        # add
        group.stocks.add(target_stock)
        group.save()

        response_dict = {'id' : target_stock.id, 'title' : target_stock.title}

        return HttpResponse(content=json.dumps(response_dict), status = 201)
                
    else :
        return HttpResponseNotAllowed(['GET', 'POST'])


def group_stock_delete(request, group_id='', stock_id=''):
    if request.method == 'DELETE':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=group_id)
        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)
        
        # get target stock
        target_stock = get_object_or_404(Stock, id=stock_id)
        # delete from group
        # 'remove' method has no error although have no target delete models
        group.stocks.remove(target_stock)

        return HttpResponse(status=200)
                
    else :
        return HttpResponseNotAllowed(['DELETE'])





