'''
comments.py
'''
from json import JSONDecodeError
import json

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest
from django.http import HttpResponseNotAllowed, HttpResponseForbidden, JsonResponse
from django.contrib.auth import get_user_model




from core.models import Stock, Comment


def comment_list(request, stock_id=""):
    '''
    comment_list
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        response_list = []
        for comment_ in Comment.objects.filter(stock=stock_id).iterator():
            response_list.append({'stock': stock_id, 'time': comment_.time,
                                  'content': comment_.content, 'author': comment_.author.nickname,
                                   'author_id': comment_.author.id, 'id': comment_.id})
        return JsonResponse(response_list, safe=False)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        stock = get_object_or_404(Stock, id=stock_id)
        try:
            req_data = json.loads(request.body.decode())
            comment_content = req_data['content']
            comment_author = req_data['author']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = get_user_model().objects.get(nickname=comment_author)
        comment_ = Comment(
            stock=stock, content=comment_content, author=user)
        comment_.save()
        response_dict = {'id': comment_.id, 'stock': comment_.stock.id,
                         'time': comment_.time, 'content': comment_.content,
                         'author': comment_.author.nickname, 'author_id': comment_.author.id}
        return JsonResponse(response_dict, status=201)


    return HttpResponseNotAllowed(['GET', 'POST'])


def comment(request, comment_id=""):
    '''
    comment
    '''
    if request.method in ['GET', 'PUT', 'DELETE']:
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

    if request.method in ['PUT', 'DELETE']:
        comment_ = get_object_or_404(Comment, id=comment_id)

        if not request.user.id == comment_.author.id:
            return HttpResponseForbidden()

    if request.method == 'GET':

        comment_ = get_object_or_404(Comment, id=comment_id)

        response_dict = {'stock': comment_.stock.id, 'time': comment_.time,
                        'content': comment_.content, 'author': comment_.author.id,
                        'author_id': comment_.author.id}
        return JsonResponse(response_dict)

    if request.method == 'PUT':

        comment_ = get_object_or_404(Comment, id=comment_id)

        # try:
        req_data = json.loads(request.body.decode())
        comment_content = req_data['content']
        # except (KeyError, JSONDecodeError):
        #     return HttpResponseBadRequest()

        comment_.content = comment_content
        comment_.save()
        response_dict = {'id': comment_.id, 'stock': comment_.stock.id,
                         'time': comment_.time, 'content': comment_.content,
                         'author': comment_.author.id, 'author_id': comment_.author.id}
        return JsonResponse(response_dict, status=200)

    if request.method == 'DELETE':

        comment_ = get_object_or_404(Comment, id=comment_id)
        comment_.delete()
        return HttpResponse(status=200)

    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
