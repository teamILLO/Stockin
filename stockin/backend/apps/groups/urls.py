from django.urls import path
from groups import views

urlpatterns = [
    path('create/', views.group_create, name='group_create'),
    path('edit/<int:id>/', views.group_edit, name='group_edit'),
    path('list/', views.group_list, name='group_list'),
    path('<int:id>/stocks/', views.group_stock_list, name='group_stock edit'),
]