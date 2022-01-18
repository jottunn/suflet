from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from team.models import TeamMember


class TeamMemberAdmin(admin.ModelAdmin):
    empty_value_display = _('empty')


admin.site.register(TeamMember, TeamMemberAdmin)


