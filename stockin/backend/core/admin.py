from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Stock, StockHistory, FinancialStat, News, Group, Comment


# User admin
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('id', 'email', 'nickname', 'is_staff', 'is_active',)
    list_filter = ('id', 'email', 'nickname', 'is_staff', 'is_active',)
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


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'code', 'sector', 'price',)
    list_display_links = ('title',)
    list_editable = ()
    list_per_page = 100
    list_filter = ()


@admin.register(FinancialStat)
class FinancialStatAdmin(admin.ModelAdmin):
    list_display = ('id','stock', 'quarter',)
    list_display_links = ('stock',)
    list_editable = ()
    list_per_page = 100
    list_filter = ()

admin.site.register(StockHistory)


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_stock_id', 'stock', 'title', 'date',)
    list_display_links = ('title',)
    list_editable = ()
    list_per_page = 50
    list_filter = ()

    def get_stock_id(self, obj):
        return obj.stock.id

    get_stock_id.admin_order_field  = 'stock'  #Allows column order sorting
    get_stock_id.short_description = 'Stock ID'  #Renames column head


admin.site.register(Group)


admin.site.register(Comment)


