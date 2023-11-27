from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *
# Тестовый комментарий для PUSH

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/users/',
         'method': 'GET',
         'body': None,
         'description': 'Return array users'
         },
        {
            'Endpoint': '/users/id/',
            'method': 'GET',
            'body': None,
            'description': 'Return a single user'
        },
        {
            'Endpoint': '/users/create/',
            'method': 'POST',
            'body': {'body': ''},
            'description': 'Creates new user with data set in post request'
        },
        {
            'Endpoint': '/users/id/update',
            'method': 'PUT',
            'body': {'body': ''},
            'description': 'Creates an existing user with data set in post request'
        },
        {
            'Endpoint': '/users/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting user'
        },
        {'Endpoint': '/bankaccounts/',
         'method': 'GET',
         'body': None,
         'description': 'Return array bank accounts'
         },
        {
            'Endpoint': '/bankaccounts/id/',
            'method': 'GET',
            'body': None,
            'description': 'Return a single bank account'
        },
        {
            'Endpoint': '/bankaccounts/create/',
            'method': 'POST',
            'body': {'body': ''},
            'description': 'Creates new bank account with data set in post request'
        },
        {
            'Endpoint': '/bankaccounts/id/update',
            'method': 'PUT',
            'body': {'body': ''},
            'description': 'Creates an existing bank account with data set in post request'
        },
        {
            'Endpoint': '/bankaccounts/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting bank account'
        },
        {'Endpoint': '/transactions/',
         'method': 'GET',
         'body': None,
         'description': 'Return array transactions'
         },
        {
            'Endpoint': '/transactions/id/',
            'method': 'GET',
            'body': None,
            'description': 'Return a single transaction'
        },
        {
            'Endpoint': '/transactions/create/',
            'method': 'POST',
            'body': {'body': ''},
            'description': 'Creates new transaction with data set in post request'
        },
        {
            'Endpoint': '/transactions/id/update',
            'method': 'PUT',
            'body': {'body': ''},
            'description': 'Creates an existing transaction with data set in post request'
        },
        {
            'Endpoint': '/transactions/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting transaction'
        }
    ]
    return Response(routes)


@api_view(['GET'])
def getUsers(request):
    accounts = User.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, pk):
    account = User.objects.get(id=pk)
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createUser(request):
    data = request.data
    account = User.objects.create(
        firstName=data['firstName'],
        surName=data['surName'],
        email=data['email'],
        password=data['password']
    )
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateUser(request, pk):
    data = request.data
    account = User.objects.get(id=pk)
    serializer = AccountSerializer(account, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteUser(request, pk):
    account = User.objects.get(id=pk)
    account.delete()
    return Response('User was deleted!')


@api_view(['GET'])
def getBankAccounts(request):
    bank_accounts = BankAccount.objects.all()
    serializer = BankAccountSerializer(bank_accounts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBankAccount(request, pk):
    bank_account = BankAccount.objects.get(id=pk)
    serializer = BankAccountSerializer(bank_account, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createBankAccount(request):
    data = request.data
    bank_account = BankAccount.objects.create(
        name=data['name'],
        userid=data['userid']
    )
    serializer = BankAccountSerializer(bank_account, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateBankAccount(request, pk):
    bank_account = BankAccount.objects.get(id=pk)
    serializer = BankAccountSerializer(bank_account, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteBankAccount(request, pk):
    bank_account = BankAccount.objects.get(id=pk)
    bank_account.delete()
    return Response('Bank account was deleted!')



@api_view(['GET'])
def getTransactions(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTransaction(request, pk):
    transaction = Transaction.objects.get(id=pk)
    serializer = TransactionSerializer(transaction, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createTransaction(request):
    data = request.data
    transaction = Transaction.objects.create(
        name=data['name'],
        type=data['type'],
        catagery=data['type'],
        bankaccountid=data['bankaccountid']
    )
    serializer = TransactionSerializer(transaction, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateTransaction(request, pk):
    transaction = Transaction.objects.get(id=pk)
    serializer = TransactionSerializer(transaction, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteTransaction(request, pk):
    transaction = Transaction.objects.get(id=pk)
    transaction.delete()
    return Response('Transaction was deleted!')