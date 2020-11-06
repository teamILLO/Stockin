from django.test import TestCase, Client
from django.contrib.auth import get_user_model
import json


class UsersTestCase(TestCase):
    ### Tests for CustomUser model
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
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
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")


    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
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
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_staff=False)
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)


    ### Tests for views.py
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        
        response = client.post('/api/users/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_signup(self):
        client = Client(enforce_csrf_checks=True)

        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 406)
         
        # HttpResponseNotAllowed tests
        response = client.get('/api/users/signup/')
        self.assertEqual(response.status_code, 405) 


    def test_signin(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # test 2
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signin/', json.dumps({'email': 'invalid@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/users/signin/')
        self.assertEqual(response.status_code, 405)


    def test_signout(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        client.post('/api/users/signup/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # test 1
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'nickname': 'user', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/signout/')
        self.assertEqual(response.status_code, 204)

        # test 2
        response = client.get('/api/users/signout/')
        self.assertEqual(response.status_code, 401)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/users/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    

