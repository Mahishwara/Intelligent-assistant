from django.contrib import admin
from .models import *
# Register your models here.
# Misha loh
admin.site.register(User)
admin.site.register(BankAccount)
admin.site.register(Transaction)