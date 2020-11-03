from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from json import JSONDecodeError
import json
from django.core.mail import EmailMessage


User = get_user_model()

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']
        try:
            User.objects.create_user(email=email, nickname=nickname, password=password)
        except IntegrityError as er:
            return HttpResponse(status= 406)
        response_dict = {'email' : email, 'nickname' : nickname, 'password' : password}
        return HttpResponse(content=json.dumps(response_dict), status = 201)
    
    else:
        return HttpResponseNotAllowed(['POST'])

        
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            response_dict = {'email' : email, 'password' : password}
            return HttpResponse(content=json.dumps(response_dict), status = 204)
        else:
            return HttpResponse(status=401)
    
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated :
            logout(request)
            return HttpResponse(status=204)
        else :
            return HttpResponse(status=401)
        
    else :
        return HttpResponseNotAllowed(['GET'])



def duplicate(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']     
        filter_result = User.objects.filter(email=email)

        if len(filter_result) >= 1:
            response_dict = {'duplicate':True}
            return HttpResponse(content=json.dumps(response_dict), status= 203)
        else:
            response_dict = {'duplicate':False}
            return HttpResponse(content=json.dumps(response_dict), status= 203)
    else :
        return HttpResponseNotAllowed(['POST'])


def sendCode(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        code = req_data['code']
        EmailMessage(
            'Hello Stokcin~',             # 제목
            'Code : '+ code,                 # 내용
            to = [email],      # 받는 이메일 리스트
        ).send()
        return HttpResponse(status=204)
    else :
        return HttpResponseNotAllowed(['POST'])


def userInfo(request):
    if request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        target_user = User.objects.get(email=email)
        target_user.set_password(password)
        target_user.save()
        return HttpResponse(status=204)
    else :
        return HttpResponseNotAllowed(['PUT'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
    