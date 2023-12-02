from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes),
    path('users/', views.getUsers),
    path('users/create', views.createUser),
    path('users/<str:pk>/update/', views.updateUser),
    path('users/<str:pk>/delete/', views.deleteUser),
    path('users/<str:pk>/', views.getUser),
    path('bankaccounts/', views.getBankAccounts),
    path('bankaccounts/create', views.createBankAccount),
    path('bankaccounts/<str:pk>/update/', views.updateBankAccount),
    path('bankaccounts/<str:pk>/delete/', views.deleteBankAccount),
    path('bankaccounts/<str:pk>/', views.getBankAccount),
    path('bankaccounts/user/<str:pk>', views.getBankAccountsUser),
    path('transactions/', views.getTransactions),
    path('transactions/create', views.createTransaction),
    path('transactions/<str:pk>/update/', views.updateTransaction),
    path('transactions/<str:pk>/delete/', views.deleteTransaction),
    path('transactions/<str:pk>/', views.getTransaction),
    path('transactions/type/<str:pk>', views.getTransactionType),
    path('transactions/category/<str:pk>', views.getTransactionCategory),
    path('transactions/bankaccount/<str:pk>', views.getTransactionBankAccount)
]