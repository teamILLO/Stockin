from django.test import TestCase, Client
from apps.groups.models import Group
from apps.stocks.models import Stock
from django.contrib.auth import get_user_model
import json

class GroupsTestCase(TestCase):
    def test_group_create(self):
        client = Client(enforce_csrf_checks=True)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/groups/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/groups/', json.dumps({'name': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # test 2
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/', json.dumps({'foo': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # test 3 
        response = client.post('/api/groups/', json.dumps({'name': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # test 4 
        response = client.get('/api/groups/')
        # TODO : test 추가

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_group_edit(self):
        client = Client(enforce_csrf_checks=True)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.put('/api/groups/1/',  json.dumps({'name': 'test'}), HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.delete('/api/groups/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # PUT request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/groups/1/',  json.dumps({'name': 'test'}), HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/', json.dumps({'name': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/groups/1/',  json.dumps({'foo': 'test'}), HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/groups/1/',  json.dumps({'name': 'new_test'}), HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/signout')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/groups/1/',  json.dumps({'name': 'new_test'}), HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/signout/')

        # DELETE request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/2/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/signout')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/groups/1/')
        self.assertEqual(response.status_code, 405)


    def test_group_stock_list(self):
        client = Client(enforce_csrf_checks=True)

        # test 1
        response = client.get('/api/groups/1/stocks/')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/1/stocks/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # GET request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/groups/1/stocks/')
        self.assertEqual(response.status_code, 404)

        test_stock = Stock.objects.create(title='test_article', code='test_code', sector='test_sector')
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/', json.dumps({'name': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        Group.objects.get(id=1).stocks.add(test_stock)

        response = client.get('/api/groups/1/stocks/')

        response = client.get('/api/users/signout/')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/groups/1/stocks/')
        self.assertEqual(response.status_code, 403)

        # POST request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/2/stocks/', json.dumps({'id': 1}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/1/stocks/', json.dumps({'id': 1}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/signout/')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # TODO : stock 모델 추가 후 group 에 stock 추가
        test_stock = Stock.objects.create(title='test_article2', code='test_code2', sector='test_sector2')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value         

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/1/stocks/', json.dumps([{'id': 1},]),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/1/stocks/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_group_stock_delete(self):
        client = Client(enforce_csrf_checks=True)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/1/stocks/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # DELETE request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/groups/1/stocks/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/groups/', json.dumps({'name': 'test'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/signout/')

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'nickname': 'user', 'password': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.delete('/api/groups/1/stocks/1/')
        self.assertEqual(response.status_code, 403)

        

        
        



        





        