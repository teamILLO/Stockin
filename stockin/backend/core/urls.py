'''
urls.py
'''
from django.urls import path
import core.views as views

urlpatterns = [
    # user model
    path('users/signup/', views.signup, name='sign_up'),
    path('users/signin/', views.signin, name='sign_in'),
    path('users/logout/', views.logoff, name='log_out'),
    path('users/signout/', views.signout, name='sign_out'),
    path('users/duplicate/', views.duplicate, name='duplicate'),
    path('users/sendCode/', views.send_code, name='send_code'),
    path('users/userInfo/', views.user_info, name='user_info'),
    path('users/token/', views.token, name='token'),

    # stock model
    path('stocks/', views.stock_list, name='stock list'),   # cached
    path('stocks/<int:stock_id>/', views.stock_info, name='stock_info'),
    path('stocks/financialstats/stock/<int:stock_id>/', views.stock_fs, name='stock_fs'),
    path('stocks/price/<int:stock_id>/', views.price_list, name='price_list'),
    path('stocks/report/up/stockinfo/',
        views.stock_top100_stockinfo,
        name='stock_top100_stockinfo'),   # cached
    path('stocks/report/up/news/', views.stock_top100_news, name='stock_top100_news'),
    path('stocks/report/up/stockhistory/',
        views.stock_top100_stockhistory,
        name='stock_top100_stockhistory'),
    path('stocks/report/down/stockinfo/',
        views.stock_bottom100_stockinfo,
        name='stock_bottom100_stockinfo'),   # cached
    path('stocks/report/down/news/', views.stock_bottom100_news, name='stock_bottom100_news'),
    path('stocks/report/down/stockhistory/',
        views.stock_bottom100_stockhistory,
        name='stock_bottom100_stockhistory'),
    path('stocks/top10/', views.stock_top10, name='stock_top10'),
    path('stocks/bottom10/', views.stock_bottom10, name='stock_bottom10'),
    path('stocks/financialstats/score/<int:stock_id>/', views.fs_score, name='fs_score'),

    # news model
    path('news/stocks/<int:stock_id>/date/<str:news_date>/',
        views.get_news_list,
        name='get_news_list'),

    # group model
    path('groups/', views.group_list_and_create, name='group_list_and_create'),
    path('groups/<int:id>/', views.group_edit, name='group_edit'),
    path('groups/<int:id>/stocks/', views.group_stock_list, name='group_stock edit'),
    path('groups/<int:group_id>/stocks/<int:stock_id>/',
        views.group_stock_delete,
        name='group_stock_delete'),

    # comment model
    path('stocks/<int:stock_id>/comments/', views.comment_list, name='comment_list'),
    path('comments/<int:comment_id>/', views.comment, name='comment'),
]
