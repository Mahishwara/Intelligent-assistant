from django.contrib import admin
from .models import *


admin.site.register(User)
admin.site.register(BankAccount)
admin.site.register(Transaction)
