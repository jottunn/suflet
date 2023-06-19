from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class TeamMember(models.Model):
    member_statuses = (
        ('A', _('available')),
        ('B', _('busy')),
        ('U', _('unavailable')),
    )
    user         = models.OneToOneField(User, on_delete=models.CASCADE)
    status       = models.CharField(max_length=1, choices=member_statuses, default=member_statuses[0][0],
                                    verbose_name=_('status'))
    full_name    = models.CharField(max_length=60, blank=False, verbose_name=_('full name'))
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name=_('phone number'))
    email        = models.EmailField()
    profile_pic  = models.ImageField(blank=True, verbose_name=_('profile picture'))
    description  = models.TextField(blank=True, max_length=1000, verbose_name=_('description'))

    def __str__(self):
        return self.full_name

