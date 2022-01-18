from django.urls import include, path, re_path

from .views import TeamMemberListView

app_name = 'team'

urlpatterns = [
    path('', TeamMemberListView.as_view(), name='team'),
]
