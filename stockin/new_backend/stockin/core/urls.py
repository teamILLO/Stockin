from django.urls import path
import core.views as views

urlpatterns = [
    # user model
    path('users/signup/', views.signup, name='sign_up'),
    path('users/signin/', views.signin, name='sign_in'),
    path('users/logout/', views.logout, name='log_out'),
    path('users/signout/', views.signout, name='sign_out'),
    path('users/duplicate/', views.duplicate, name='duplicate'),
    path('users/sendCode/', views.send_code, name='send_code'),
    path('users/userInfo/', views.user_info_2, name='user_info_2'),
    path('users/token/', views.token, name='token'),
    path('users/<int:id>/', views.user_info_1, name='user_info_1'),

    # stock model
    path('stocks/', views.stock_list, name='stock list'),
    path('stocks/financialstats/stock/<int:stock_id>/',
         views.stock_fs, name='stock_fs'),
    path('stocks/price/<int:stock_id>/', views.price_list, name='price_list'),

    # news model
    path('news/stocks/<int:stock_id>/date/<str:news_date>/', views.get_news_list, name='get_news_list'),
    
    # group model
    path('groups/', views.group_list_and_create, name='group_list_and_create'),
    path('groups/<int:id>/', views.group_edit, name='group_edit'),
    path('groups/<int:id>/stocks/', views.group_stock_list, name='group_stock edit'),
    path('groups/<int:group_id>/stocks/<int:stock_id>/', views.group_stock_delete, name='group_stock_delete'),

    # comment model
    path('stocks/<int:stock_id>/comments/', views.comment_list, name='comment_list'),
    path('comments/<int:comment_id>/', views.comment, name='comment'),
]
