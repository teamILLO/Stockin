from django.urls import path
from comments import views

urlpatterns = [
    path('stocks/<int:stock_id>/comments/', views.comment_list, name='comment_list'),
    path('comments/<int:comment_id>/', views.comment, name='comment')
]