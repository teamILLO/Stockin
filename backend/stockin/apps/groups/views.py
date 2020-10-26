from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from json import JSONDecodeError
import json

from apps.groups.models import Group

 
## Group views
def group_create(request):
    if request.method == 'POST':
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
        return HttpResponseNotAllowed(['POST'])


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

        try : 
            body = request.body.decode()
            name = json.loads(body)['name']
            user = request.user
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        group.delete()
        return HttpResponse(status=200)

    else :
        return HttpResponseNotAllowed(['PUT', 'DELETE'])


def group_list(request) :
    if request.method == 'GET':
        # check if user is logged_in
        if not request.user.is_authenticated :
            return HttpResponse(status=401)

        response_list = []
        group_list = [group for group in Group.objects.all() if group.user == request.user]
        for group in group_list : 
            response_dict = {'id' : group.id, 'user' : group.user.email, 'name' : group.name}
            response_list.append(response_dict)

        return JsonResponse(response_list, safe=False)

    else :
        return HttpResponseNotAllowed(['GET'])


