from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer
from .models import Account

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/accounts/',
         'method': 'GET',
         'body': None,
         'description': 'Return array accounts'}
    ]
    return Response(routes)


@api_view(['GET'])
def getAccounts(request):
    accounts = Account.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAccount(request, pk):
    account = Account.objects.get(id=pk)
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createAccount(request):
    data = request.data
    account = Account.objects.create(
        firstName=data['firstName'],
        surName=data['surName'],
        email=data['email']
    )
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateAccount(request, pk):
    data = request.data
    account = Account.objects.get(id=pk)
    serializer = AccountSerializer(account, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteAccount(request, pk):
    account = Account.objects.get(id=pk)
    account.delete()
    return Response('Account was deleted!')