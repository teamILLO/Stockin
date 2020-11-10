from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/groups/', include('apps.groups.urls')),
    path('api/news/', include('apps.news.urls')),
    path('api/stocks/', include('apps.stocks.urls')),
    path('api/', include('apps.comments.urls')),
]