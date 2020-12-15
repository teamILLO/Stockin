'''
groups
'''
from json import JSONDecodeError
import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404

from core.models import Group, Stock, FinancialStat
from core.views.index import get_fs_info

def group_list_and_create(request):
    '''
    group_list_and_create
    '''
    if request.method == 'GET':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        response_list = []
        group_list = [group for group in Group.objects.all() if group.user == request.user]

        for group in group_list :
            # Make stock list
            response_stock_list = []

            stock_list = group.stocks.all()

            for stock in stock_list :
                fs_stock = FinancialStat.objects.filter(stock_id=stock.id)
                fs_score = get_fs_info(stock, fs_stock)
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

    if request.method == 'POST':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            user = request.user
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        group = Group(user=user, name=name)
        group.save()

        response_dict = {'id' : group.id, 'user': group.user.email, 'name' : group.name}
        return HttpResponse(content=json.dumps(response_dict), status = 201)


    return HttpResponseNotAllowed(['GET', 'POST'])


def group_edit(request, id='') :
    '''
    group_edit
    '''
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

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        group.name = name
        group.save()

        response_dict = {'id' : group.id, 'user': group.user.email, 'name' : group.name}
        return HttpResponse(content=json.dumps(response_dict), status = 200)

    if request.method == 'DELETE':
        # check user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        group = get_object_or_404(Group, id=id)

        # check user valid
        if group.user != request.user :
            return HttpResponse(status=403)

        # TO-do : Delete fail handle
        group.delete()

        return HttpResponse(status=200)


    return HttpResponseNotAllowed(['PUT', 'DELETE'])


def group_stock_list(request, id=''):
    '''
    group_stock_list
    '''
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

    if request.method == 'POST':
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

        except (KeyError, JSONDecodeError):
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


    return HttpResponseNotAllowed(['GET', 'POST'])


def group_stock_delete(request, group_id='', stock_id=''):
    '''
    group_stock_delete
    '''
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


    return HttpResponseNotAllowed(['DELETE'])
