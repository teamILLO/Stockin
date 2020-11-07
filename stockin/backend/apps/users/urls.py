from django.urls import path
from users import views

urlpatterns = [
    # user model
    path('signup/', views.signup, name='sign_up'),
    path('signin/', views.signin, name='sign_in'),
    path('logout/', views.logoff, name='log_out'),
    path('signout/', views.signout, name='sign_out'),
    path('token/', views.token, name='token'),
]
