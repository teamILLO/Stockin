from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'nickname', 'is_staff', 'is_active',)
    list_filter = ('email', 'nickname', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'nickname', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nickname', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email','nickname', )
    ordering = ('email','nickname', )


admin.site.register(CustomUser, CustomUserAdmin)