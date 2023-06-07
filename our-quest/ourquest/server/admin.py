from django.contrib import admin

# Register your models here.
from .models import Quest, User, Topic, Comment, Profile

admin.site.register(Quest)
admin.site.register(Topic)
admin.site.register(Comment)
admin.site.register(Profile)

