from rest_framework import serializers
from .models import Quest, User, Topic, Comment, Profile

class TopicSerializer(serializers.ModelSerializer):
    captain = serializers.ReadOnlyField(source='captain.username')

    class Meta:
        model = Topic
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(allow_null=True, required=False)
    class Meta:
        model = Profile
        fields = '__all__'

class QuestSerializer(serializers.ModelSerializer):
    captain = serializers.ReadOnlyField(source='captain.username')
    participants = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all())

    class Meta:
        model = Quest
        fields = ('id', 'title', 'content', 'captain', 'participants', 'topic', 'public')


class UserSerializer(serializers.ModelSerializer):
    created_quests = QuestSerializer(many=True, read_only=True)
    participating_in = serializers.StringRelatedField(many=True)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'created_quests', 'participating_in', 'profile']

