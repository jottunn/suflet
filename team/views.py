from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings

from .models import TeamMember


class TeamMemberListView(LoginRequiredMixin, ListView):
    model         = TeamMember
    template_name = 'team/teamMemberListView_view.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["chat_script_src"] = settings.CHAT_SCRIPT_SRC[0]
        return context
