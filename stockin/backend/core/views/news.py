'''
news
'''
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

from core.models import News


def get_news_list(request, stock_id='', news_date='') :
    '''
    get_news_list
    '''
    if request.method == 'GET':
        if len(news_date) != 8 :
            return HttpResponseBadRequest()

        year = int(news_date[0:4])
        month = int(news_date[4:6])
        day = int(news_date[6:8])

        # For debugging
        # print(News.objects.all().explain())
        # print(News.objects.filter(stock__id = stock_id).explain())
        # print(News.objects.filter(date__year = year).explain())
        # print(News.objects.filter(date__month = month).explain())
        # print(News.objects.filter(date__day = day).explain())

        news_ = News.objects.filter(stock__id = stock_id)
        news_list = [news for news in news_ if news.date.year == year
                                           and news.date.month == month
                                           and news.date.day == day]

        response_list = []
        for news in news_list:
            response_dict = { 'id' : news.id, 'title' : news.title, 'press' : news.press,
                            'link' : news.link, 'date' : news.date }
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)

    return HttpResponseNotAllowed(['GET'])
