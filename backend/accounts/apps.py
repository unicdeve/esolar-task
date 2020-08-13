from django.apps import AppConfig
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse


class AccountsConfig(AppConfig):
    name = "accounts"
