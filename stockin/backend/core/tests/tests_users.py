'''
tests_users
'''
import os
import json

from django.test import TestCase, Client
from django.contrib.auth import get_user_model

pwd = os.getenv("BACK_TEST_PWD").split(',')[0]
new_pwd = os.getenv("BACK_TEST_PWD").split(',')[1]

class UsersTestCase(TestCase):
    '''
    UsersTestCase
    '''
    # Tests for CustomUser model
    def test_create_user(self):
        '''
        test_create_user
        '''
        user_ = get_user_model()
        user = user_.objects.create_user(
            email='normal@user.com', password=pwd)
        self.assertEqual(str(user), 'normal@user.com')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            user_.objects.create_user()
        with self.assertRaises(TypeError):
            user_.objects.create_user(email='')
        with self.assertRaises(ValueError):
            user_.objects.create_user(email='', password=pwd)

    def test_create_superuser(self):
        '''
        test_create_superuser
        '''
        user_ = get_user_model()
        admin_user = user_.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            user_.objects.create_superuser(
                email='super@user.com', password=pwd, is_staff=False)
        with self.assertRaises(ValueError):
            user_.objects.create_superuser(
                email='super@user.com', password=pwd, is_superuser=False)

    def test_csrf(self):
        '''
        test_csrf
        '''
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/users/signup/',
                    json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
                    content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/users/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signup/',
                    json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signup(self):
        '''
        test_signup
        '''
        client = Client(enforce_csrf_checks=True)

        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/',
                    json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/',
                    json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 406)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/signup/')
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        '''
        test_signin
        '''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signup/', json.dumps(
            {'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json',
            HTTP_X_CSRFTOKEN=csrftoken)

        # POST request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps(
            {'invalid': 'normal@user.com'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'invalid@user.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/users/signin/')
        self.assertEqual(response.status_code, 405)

    def test_signout(self):
        '''
        test_signout
        '''
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps(
            {'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # POST request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signout/', json.dumps(
            {'invalid' : 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signout/', json.dumps(
            {'email': 'foo@foo.com', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signout/', json.dumps(
            {'email': 'normal@user.com', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/signout/')
        self.assertEqual(response.status_code, 405)

    def test_duplicate(self):
        '''
        test_duplicate
        '''
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps(
            {'email': 'normal@normal.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # POST request
        # Email duplicate
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/duplicate/', json.dumps(
            {'email': 'normal@normal.com', 'nickname' : ''}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 203)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/duplicate/', json.dumps(
            {'email': 'foo@foo.com', 'nickname' : ''}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 203)

        # Nickname duplicate
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/duplicate/', json.dumps(
            {'email': '', 'nickname' : 'user'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 203)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/duplicate/', json.dumps(
            {'email': '', 'nickname' : 'foo'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 203)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/duplicate/')
        self.assertEqual(response.status_code, 405)

    def test_send_code(self):
        '''
        test_send_code
        '''
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps(
            {'email': 'normal@user.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # POST request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/sendCode/', json.dumps(
            {'email': 'normal@normal.com', 'code' : '1'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/sendCode/')
        self.assertEqual(response.status_code, 405)



    def test_user_info(self):
        '''
        test_user_info
        '''
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps(
            {'email': 'normal@normal.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # When user is not authenticated in GET, PUT request
        response = client.get('/api/users/userInfo/')
        self.assertEqual(response.status_code, 203)

        response = client.get('/api/users/logout/')
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'change': 'nickname', 'email': 'invalid@invalid.com', 'password': new_pwd}),
            HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # GET request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'normal@normal.com', 'nickname': 'user', 'password': pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/userInfo/')
        self.assertEqual(response.status_code, 203)

        # PUT request
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'change': 'password', 'email': 'invalid@invalid.com', 'password': new_pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'change': 'password', 'email': 'normal@normal.com', 'password': new_pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'normal@normal.com', 'nickname': 'user', 'password': new_pwd}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'change': 'nickname', 'email': 'foo@foo.com', 'nickname': 'foo_new'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'change': 'nickname', 'email': 'normal@normal.com', 'nickname': 'foo_new'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/users/userInfo/', json.dumps(
            {'invalid' : 'invalid'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # HttpResponseNotAllowed tests
        response = client.post('/api/users/userInfo/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_logout(self):
        '''
        test_logout
        '''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        client.post('/api/users/signup/', json.dumps({'email':'normal@user.com', 'nickname':'user',
                                                      'password': pwd}),
                                                      content_type='application/json',
                                                      HTTP_X_CSRFTOKEN=csrftoken)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        client.post('/api/users/signin/', json.dumps({'email':'normal@user.com', 'nickname':'user',
                                                      'password': pwd}),
                                                      content_type='application/json',
                                                      HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/users/logout/')
        self.assertEqual(response.status_code, 204)

        # test 2
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get(
            '/api/users/logout/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/logout/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
