from django.test import TestCase, Client
from apps.comments.models import Comment
from apps.stocks.models import Stock

from django.contrib.auth import get_user_model
import json

# Create your tests here.

<<<<<<< HEAD

=======
>>>>>>> comment
class CommentsTestCase(TestCase):
    def setUp(self):
        stock = Stock(title='TEST_STOCK')
        stock.save()
<<<<<<< HEAD

        User = get_user_model()
        user = User.objects.create_user(
            email='normal@user.com', password='foo')

        comment = Comment(stock=stock, content='TEST_COMMENT', author=user)
=======
        
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')

        comment = Comment(stock=stock ,content='TEST_COMMENT',author=user)
>>>>>>> comment
        comment.save()

        User.objects.create_user(email='normal2@user.com', password='foo')

    def test_comment_list_get(self):
<<<<<<< HEAD
        # CSRF setting
=======
        #CSRF setting
>>>>>>> comment
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

<<<<<<< HEAD
        # User signin
        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # User logout
        response = client.get('/api/users/signout/')

        # GET comment_list for non-existing stock without login
=======
        #User signin
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        #User logout
        response = client.get('/api/users/signout/')

        #GET comment_list for non-existing stock without login
>>>>>>> comment
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/stocks/2/comments/')
<<<<<<< HEAD
        self.assertEqual(response.status_code, 401)

        # GET comment_list for existing stock without login
=======
        #self.assertEqual(response.status_code, 401)

        #GET comment_list for existing stock without login
>>>>>>> comment
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/stocks/1/comments/')
<<<<<<< HEAD
        self.assertEqual(response.status_code, 401)

        # GET comment_list for non-existing stock with login
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps(
            {'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
=======
        #self.assertEqual(response.status_code, 401)

        #GET comment_list for non-existing stock with login
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
>>>>>>> comment

        response = client.get('/api/stocks/2/comments/')
        self.assertEqual(response.status_code, 404)

<<<<<<< HEAD
        # GET comment_list for existing stock with login
        response = client.get('/api/stocks/1/comments/')
        self.assertEqual(response.json()[0]['content'], 'TEST_COMMENT')

    def test_comment_list_post_and_else(self):
        # CSRF setting
=======
        #GET comment_list for existing stock with login
        response = client.get('/api/stocks/1/comments/')
        self.assertEqual(response.json()[0]['content'], 'TEST_COMMENT')
    
    def test_comment_list_post_and_else(self):
        #CSRF setting
>>>>>>> comment
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

<<<<<<< HEAD
        # DELETE on non-existing stock without signin
        response = client.delete('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # POST on non-existing stock without signin
        response = client.post('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # POST on existing stock without signin
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'TEST_POST'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # POST on non-existing stock with signin
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # POST on existing stock with signin
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'TEST_POST'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['content'], 'TEST_POST')

        # Key Error
        response = response = client.post('/api/stocks/1/comments/', json.dumps({'cooooontent': 'TEST_POST'}),
                                          content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_comment_get(self):
        # CSRF setting
=======
        #DELETE on non-existing stock without signin
        response = client.delete('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        #POST on non-existing stock without signin
        response = client.post('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #POST on existing stock without signin
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #POST on non-existing stock with signin
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/stocks/2/comments/', json.dumps({'content': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        #POST on existing stock with signin
        response = client.post('/api/stocks/1/comments/', json.dumps({'content': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['content'], 'TEST_POST')

        #Key Error
        response = response = client.post('/api/stocks/1/comments/', json.dumps({'cooooontent': 'TEST_POST'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_comment_get(self):
        #CSRF setting
>>>>>>> comment
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

<<<<<<< HEAD
        # GET non-existing comment without login
        response = client.get('/api/comments/2/')
        self.assertEqual(response.status_code, 401)

        # GET existing comment without login
        response = client.get('/api/comments/1/')
        self.assertEqual(response.status_code, 401)

        # GET non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
=======
        #GET non-existing comment without login
        response = client.get('/api/comments/2/')
        #self.assertEqual(response.status_code, 401)

        #GET existing comment without login
        response = client.get('/api/comments/1/')
        #self.assertEqual(response.status_code, 401)

        #GET non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
>>>>>>> comment
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/comments/2/')
        self.assertEqual(response.status_code, 404)

<<<<<<< HEAD
        # GET existing comment with login
        response = client.get('/api/comments/1/')
        self.assertEqual(response.json()['content'], 'TEST_COMMENT')

    def test_comment_put(self):
        # CSRF setting
=======
        #GET existing comment with login
        response = client.get('/api/comments/1/')
        self.assertEqual(response.json()['content'], 'TEST_COMMENT')
    
    def test_comment_put(self):
        #CSRF setting
>>>>>>> comment
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

<<<<<<< HEAD
        # PUT non-existing comment without login
        response = client.put('/api/comments/2/', json.dumps({'content': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # PUT non-existing comment without login, Key Error
        response = client.put('/api/comments/2/', json.dumps({'coooooooontent': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # PUT existing comment without login
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # PUT existing comment without login, Key Error
        response = client.put('/api/comments/1/', json.dumps({'coooooooooooooontent': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # PUT non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
=======
        #PUT non-existing comment without login
        response = client.put('/api/comments/2/', json.dumps({'content': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #PUT non-existing comment without login, Key Error
        response = client.put('/api/comments/2/', json.dumps({'coooooooontent': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #PUT existing comment without login
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #PUT existing comment without login, Key Error
        response = client.put('/api/comments/1/', json.dumps({'coooooooooooooontent': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #PUT non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
>>>>>>> comment
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.put('/api/comments/2/', json.dumps({'content': 'TEST_PUT'}),
<<<<<<< HEAD
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # PUT non-existing comment with login, Key Error
        response = client.put('/api/comments/2/', json.dumps({'coooooooooooontent': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # PUT existing comment with login, not an author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        # PUT existing comment with login, not an author, Key Error
        response = client.put('/api/comments/1/', json.dumps({'cooooooooooontent': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        # PUT existing comment with login, the author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'TEST_PUT')

        # PUT existing comment, Key Error
        response = client.put('/api/comments/1/', json.dumps({'cooooooontent': 'TEST_PUT'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_comment_delete_and_post(self):
        # CSRF setting
=======
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        #PUT non-existing comment with login, Key Error
        response = client.put('/api/comments/2/', json.dumps({'coooooooooooontent': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        #PUT existing comment with login, not an author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 403)

        #PUT existing comment with login, not an author, Key Error
        response = client.put('/api/comments/1/', json.dumps({'cooooooooooontent': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 403)

        #PUT existing comment with login, the author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/comments/1/', json.dumps({'content': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'TEST_PUT')

        #PUT existing comment, Key Error
        response = client.put('/api/comments/1/', json.dumps({'cooooooontent': 'TEST_PUT'}),
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
    
    def test_comment_delete_and_post(self):
        #CSRF setting
>>>>>>> comment
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

<<<<<<< HEAD
        # POST non-existing comment without login
        response = client.post('/api/comments/2/',
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # DELETE non-existing comment without login
        response = client.delete('/api/comments/2/',
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # DELETE existing comment without login
        response = client.delete('/api/comments/1/',
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # DELETE non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
=======
        #POST non-existing comment without login
        response = client.post('/api/comments/2/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        #DELETE non-existing comment without login
        response = client.delete('/api/comments/2/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #DELETE existing comment without login
        response = client.delete('/api/comments/1/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        #DELETE non-existing comment with login
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
>>>>>>> comment
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/api/comments/2/',
<<<<<<< HEAD
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # DELETE existing comment with login, not an author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/',
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        # DELETE existing comment with login, the author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com',
                                                      'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/',
                                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Comment.objects.all().values()), 0)
=======
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        #DELETE existing comment with login, not an author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal2@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 403)

        #DELETE existing comment with login, the author
        response = client.get('/api/users/signout/')
        client.post('/api/users/signin/', json.dumps({'email': 'normal@user.com', 'password': 'foo'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/comments/1/',
                    content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Comment.objects.all().values()), 0)







>>>>>>> comment
