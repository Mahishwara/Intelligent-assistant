# Generated by Django 4.2.7 on 2023-11-25 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_bankaccount_transaсtion_user_delete_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('type', models.TextField()),
                ('category', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=20)),
                ('bankaccountid', models.IntegerField()),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['bankaccountid', '-updated', 'created'],
            },
        ),
        migrations.DeleteModel(
            name='Transaсtion',
        ),
    ]
