from django.contrib import admin
from apps.groups.models import Group, GroupStock

# Register your models here.
admin.site.register(Group)
admin.site.register(GroupStock)