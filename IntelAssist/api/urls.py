from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes),
    path('accounts/', views.getAccounts),
    path('accounts/create', views.createAccount),
    path('accounts/<str:pk>/update/', views.updateAccount),
    path('accounts/<str:pk>/delete/', views.deleteAccount),
    path('accounts/<str:pk>/', views.getAccount),
]