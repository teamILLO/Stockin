'''
users
'''
import json
from json import JSONDecodeError

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError
from django.core.mail import EmailMessage


User = get_user_model()


def signup(request):
    '''
    signup
    '''
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']
        try:
            User.objects.create_user(
                email=email, nickname=nickname, password=password)
        except IntegrityError:
            return HttpResponse(status=406)
        request.session['user'] = user.id
        response_dict = {'email': email, 'nickname': nickname, 'id':user.id}
        return HttpResponse(content=json.dumps(response_dict), status=201)


    return HttpResponseNotAllowed(['POST'])


def signin(request):
    '''
    signin
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            request.session['user'] = user.id
            response_dict = {'email': email, 'nickname': user.nickname,'id': user.id}
            return JsonResponse(response_dict, status=201)

        return HttpResponse(status=401)


    return HttpResponseNotAllowed(['POST'])

def check_login(request):
    '''
    check_login
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            response_dict = {'email': request.user.email, 'nickname': request.user.nickname, 'id': request.user.id}
            return JsonResponse(response_dict, status=200)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])


def logoff(request):
    '''
    logoff
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            if request.session.get('user'):
                del(request.session['user'])
            return HttpResponse(status=204)

        return HttpResponse(status=401)


    return HttpResponseNotAllowed(['GET'])


def signout(request):
    '''
    signout
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(email=email, password=password)
        if user is not None and user.is_authenticated:
            user.delete()
            if request.session.get('user'):
                del(request.session['user'])
            return HttpResponse(status=204)

        return HttpResponse(status=401)


    return HttpResponseNotAllowed(['POST'])


def duplicate(request):
    '''
    duplicate
    '''
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

        response_dict = {'duplicate': False }
        return HttpResponse(content=json.dumps(response_dict), status=203)


    return HttpResponseNotAllowed(['POST'])


def send_code(request):
    '''
    send_code
    '''
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


    return HttpResponseNotAllowed(['POST'])


def user_info(request):
    '''
    user_info
    '''
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
            response_dict={}
            if req_data['change'] == 'password':
                email = req_data['email']
                password = req_data['password']
                target_user = get_object_or_404(User, email=email)
                target_user.set_password(password)
                target_user.save()
                response_dict = {'email': target_user.email, 'nickname': target_user.nickname,'id': target_user.id}

            if req_data['change'] == 'nickname':
                email = req_data['email']
                nickname = req_data['nickname']
                target_user = get_object_or_404(User, email=email)
                target_user.nickname = nickname
                target_user.save()
                response_dict = {'email': target_user.email, 'nickname': target_user.nickname, 'id': target_user.id}

            return JsonResponse(response_dict, status=201)

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()


    return HttpResponseNotAllowed(['GET','PUT'])



@ensure_csrf_cookie
def token(request):
    '''
    token
    '''
    if request.method == 'GET':
        return HttpResponse(status=204)


    return HttpResponseNotAllowed(['GET'])
