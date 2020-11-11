from django.contrib import admin
from .models import News
# Register your models here.

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
