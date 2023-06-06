from django.contrib import admin
from django.urls import path
from server.views import index, quest, quest_detail, login_view, signup_view, logout_view, get_user_info, get_all_users_info


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", index, name="index"),
    path("quests/", quest, name="quest"),
    path("quests/<int:pk>/", quest_detail, name="detail"), 
    path("login/", login_view, name="login"),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('users/' , get_all_users_info, name='users'),
    path('users/<int:pk>/', get_user_info, name='user'),
]
