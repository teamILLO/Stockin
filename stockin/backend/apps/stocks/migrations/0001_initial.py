

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=200)),
                ('sector', models.CharField(blank=True, max_length=200, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('highestPrice', models.IntegerField(blank=True, null=True)),
                ('lowestPrice', models.IntegerField(blank=True, null=True)),
                ('tradeVolume', models.IntegerField(blank=True, null=True)),
                ('tradeValue', models.BigIntegerField(blank=True, null=True)),
                ('startPrice', models.IntegerField(blank=True, null=True)),
                ('yesterdayPrice', models.IntegerField(blank=True, null=True)),
                ('amount', models.IntegerField(blank=True, null=True)),
                ('isKOSPI', models.BooleanField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='StockHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(null=True)),
                ('endPrice', models.IntegerField(null=True)),
                ('startPrice', models.IntegerField(null=True)),
                ('highestPrice', models.IntegerField(null=True)),
                ('lowestPrice', models.IntegerField(null=True)),
                ('tradeVolume', models.IntegerField(null=True)),
                ('upDown', models.IntegerField(null=True)),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stocks.stock')),
            ],
        ),
    ]
