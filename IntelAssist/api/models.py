from django.db import models


class Account(models.Model):
    firstName = models.TextField()
    surName = models.TextField()
    email = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-updated', 'created']
