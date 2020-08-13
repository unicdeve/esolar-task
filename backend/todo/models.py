from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def str(self):
        return self.title

