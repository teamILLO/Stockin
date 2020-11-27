from django.test import TestCase, Client
from core.models import News, Stock, Comment, CustomUser
from django.contrib.auth import get_user_model

import json

class NewsTestCase(TestCase):
    def test_comment_list(self):
        client = Client(enforce_csrf_checks=True)

        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        
        # GET request when user is not logged_in
        response = client.get('/api/stocks/1/comments/')
        self.assertEqual(response.status_code, 401)

        # POST request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/stocks/1/comments/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

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
        response = client.post('/api/stocks/2/comments/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/stocks/1/comments/', json.dumps({'invalid': 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'foo', 'author' : 'user'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # GET request
        response = client.get('/api/stocks/1/comments/')
        self.assertEqual(response.status_code, 200) 

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/1/comments/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_comment(self):
        client = Client(enforce_csrf_checks=True)

        # GET, PUT, DELETE request when user is not logged_in
        response = client.get('/api/comments/1/')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Create test comment
        # Create comment with "id = 1"
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
    
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
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'foo', 'author' : 'user'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # Create comment with "id = 2"
        test_user = CustomUser.objects.create(email = 'foo@foo.com', nickname = 'foo', is_staff=False, is_active=False)
        test_comment = Comment.objects.create(stock = test_stock, author = test_user, content = 'foo')

        # GET request
        response = client.get('/api/comments/3/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/comments/1/')
        self.assertEqual(response.status_code, 200)

        # PUT request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/3/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/2/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'invalid' : 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'content' : 'foo_changed'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # DELETE request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/3/', json.dumps({'invalid' : 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/2/', json.dumps({'invalid' : 'foo'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/comments/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        



        

        