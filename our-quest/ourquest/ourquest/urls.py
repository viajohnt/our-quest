from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from server.views import index, quest, topic, comment, profile_list, quest_detail, login_view, signup_view, logout_view, get_user_info, get_all_users_info, profile_detail, topic_detail


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
    path("topics/", topic, name="topic"),
    path("topics/<int:pk>/", topic_detail, name="topic_detail"),
    path("comments/", comment, name="comment"),
    path("profile/", profile_list, name="profile"),
    path('profile/<int:pk>/', profile_detail, name='profile_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
