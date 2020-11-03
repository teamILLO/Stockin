from django.urls import path
from users import views

urlpatterns = [
    # user model
    path('signup/', views.signup, name='sign_up'),
    path('signin/', views.signin, name='sign_in'),
    path('signout/', views.signout, name='sign_out'),
    path('duplicate/', views.duplicate, name='duplicate'),
    path('sendCode/', views.sendCode, name='send_code'),
    path('userInfo/', views.userInfo, name='user_info'),
    path('token/', views.token, name='token'),
]