from rest_framework.serializers import ModelSerializer
from .models import *

class AccountSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BankAccountSerializer(ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'
