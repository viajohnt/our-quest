from rest_framework import serializers
from .models import Quests

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quests
        fields = ('id', 'title', 'content')