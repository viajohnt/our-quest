from rest_framework import serializers
from .models import Quest

class QuestSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Quest
        fields = ('id', 'title', 'content', 'creator')