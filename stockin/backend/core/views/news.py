from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model

from json import JSONDecodeError
import json

from core.models import News


def get_news_list(request, stock_id='', news_date='') :
    if request.method == 'GET':
        if len(news_date) is not 8 :
            return HttpResponseBadRequest()

        year = int(news_date[0:4])
        month = int(news_date[4:6])
        day = int(news_date[6:8])
        news_list = [news for news in News.objects.all() 
                        if news.stock.id == stock_id 
                           and news.date.year == year
                           and news.date.month == month
                           and news.date.day == day ]

        response_list = []
        for news in news_list:
            response_dict = { 'id' : news.id, 'title' : news.title, 'press' : news.press, 'link' : news.link, 'date' : news.date }
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)
    
    else :
        return HttpResponseNotAllowed(['GET'])