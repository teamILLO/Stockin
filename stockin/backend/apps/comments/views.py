from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseForbidden, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from json import JSONDecodeError
import json

from apps.comments.models import Comment
from apps.stocks.models import Stock


# Create your views here.
def comment_list(request, stock_id=""):
    if request.method == 'GET':
<<<<<<< HEAD
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
=======
>>>>>>> comment
        get_object_or_404(Stock, id=stock_id)

        response_list = []
        for comment in Comment.objects.filter(stock= stock_id).iterator():
<<<<<<< HEAD
            response_list.append({'stock': stock_id, 'time': comment.time, 'content': comment.content, 'author': comment.author.id})
        return JsonResponse(response_list, safe=False)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
=======
            response_list.append({'id': comment.id, 'stock': stock_id, 'time': comment.time, 'content': comment.content, 'author': comment.author.nickname})
        return JsonResponse(response_list, safe=False)
    elif request.method == 'POST':
>>>>>>> comment
        stock = get_object_or_404(Stock, id=stock_id)
        try:
            req_data = json.loads(request.body.decode())
            comment_content = req_data['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        comment = Comment(stock=stock, content=comment_content, author=request.user)
        comment.save()
<<<<<<< HEAD
        response_dict = {'id': comment.id, 'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.id}
=======
        response_dict = {'id': comment.id, 'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.nickname}
>>>>>>> comment
        return JsonResponse(response_dict, status=201)
    
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
<<<<<<< HEAD
def comment(request, comment_id=""):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        comment = get_object_or_404(Comment, id=comment_id)
        
        response_dict = {'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.id}
        return JsonResponse(response_dict)

    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        comment = get_object_or_404(Comment, id=comment_id)

        if not (request.user.id == comment.author.id):
            return HttpResponseForbidden()

=======
@csrf_exempt
def comment(request, comment_id=""):
    if request.method == 'GET':
        comment = get_object_or_404(Comment, id=comment_id)
        
        response_dict = {'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.nickname}
        return JsonResponse(response_dict)

    elif request.method == 'PUT':
        comment = get_object_or_404(Comment, id=comment_id)
>>>>>>> comment
        try:
            req_data = json.loads(request.body.decode())
            comment_content = req_data['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        comment.content = comment_content
        comment.save()
<<<<<<< HEAD
        response_dict = {'id': comment.id, 'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.id}
        return  JsonResponse(response_dict, status=200)
    
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status= 401)
        comment = get_object_or_404(Comment, id=comment_id)
        if not (request.user.id == comment.author.id):
            return HttpResponseForbidden()
=======
        response_dict = {'id': comment.id, 'stock': comment.stock.id, 'time': comment.time, 'content': comment.content, 'author': comment.author.nickname}
        return  JsonResponse(response_dict, status=200)
    
    elif request.method == 'DELETE':
        comment = get_object_or_404(Comment, id=comment_id)
>>>>>>> comment
        
        comment.delete()
        return HttpResponse(status=200)

    else:
        return  HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
