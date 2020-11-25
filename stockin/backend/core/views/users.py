from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.db.utils import IntegrityError
from django.core.mail import EmailMessage
import json
from json import JSONDecodeError

User = get_user_model()


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']
        try:
            User.objects.create_user(
                email=email, nickname=nickname, password=password)
        except IntegrityError as er:
            return HttpResponse(status=406)
        response_dict = {'email': email,
                         'nickname': nickname, 'password': password}
        return HttpResponse(content=json.dumps(response_dict), status=201)

    else:
        return HttpResponseNotAllowed(['POST'])


def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            # request.session['user'] = user.id
            response_dict = {'email': email, 'nickname': user.nickname,
                             'password': password, 'id': user.id}
            return JsonResponse(response_dict, status=201)
        else:
            return HttpResponse(status=401)

    else:
        return HttpResponseNotAllowed(['POST'])


def logoff(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
            
    else:
        return HttpResponseNotAllowed(['GET'])


def signout(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        user = authenticate(email=email, password=password)
        if user is not None and user.is_authenticated:
            user.delete()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)

    else:
        return HttpResponseNotAllowed(['POST'])


def duplicate(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        nickname = req_data['nickname']

        # Check email duplicate
        if(email and not nickname) :
            filter_result = User.objects.filter(email = email)
        # Check nickname duplicate
        if(nickname and not email) :
            filter_result = User.objects.filter(nickname = nickname)

        if len(filter_result) >= 1:
            response_dict = {'duplicate': True }
            return HttpResponse(content=json.dumps(response_dict), status=203)
        else:
            response_dict = {'duplicate': False }
            return HttpResponse(content=json.dumps(response_dict), status=203)

    else:
        return HttpResponseNotAllowed(['POST'])


def send_code(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        code = req_data['code']
        EmailMessage(
            'Hello Stockin~',           # 제목
            'Code : ' + code,           # 내용
            to=[email],                 # 받는 이메일 리스트
        ).send()
        return HttpResponse(status=204)

    else:
        return HttpResponseNotAllowed(['POST'])


def user_info(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            response_dict = {'email': 'none', 'nickname': 'none'}
            return HttpResponse(content=json.dumps(response_dict), status=203)

        response_dict = {'email': request.user.email,
                         'nickname': request.user.nickname}
        return HttpResponse(content=json.dumps(response_dict), status=203)

    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            if req_data['change'] == 'password':
                email = req_data['email']
                password = req_data['password']
                target_user = get_object_or_404(User, email=email)
                target_user.set_password(password)
                target_user.save()
                response_dict = {'email': target_user.email, 'nickname': target_user.nickname,
                                    'password': target_user.password, 'id': target_user.id}
                return JsonResponse(response_dict, status=201)

            elif req_data['change'] == 'nickname':
                email = req_data['email']
                nickname = req_data['nickname']
                target_user = get_object_or_404(User, email=email)
                target_user.nickname = nickname
                target_user.save()
                response_dict = {'email': target_user.email, 'nickname': target_user.nickname,
                                    'password': target_user.password, 'id': target_user.id}
                return JsonResponse(response_dict, status=201)

        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

    else:
        return HttpResponseNotAllowed(['GET','PUT'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
        
    else:
        return HttpResponseNotAllowed(['GET'])
