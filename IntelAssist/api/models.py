from django.db import models


class User(models.Model):
    firstName = models.TextField()
    surName = models.TextField()
    email = models.TextField()
    password = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-updated', 'created']


class BankAccount(models.Model):
    name = models.TextField()
    userid = models.IntegerField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['userid', '-updated', 'created']





    class Meta:
        ordering = ['userid', '-updated', 'created']