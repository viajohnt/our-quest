from rest_framework import serializers
from .models import Quest, User, Topic, Comment, Profile

class TopicSerializer(serializers.ModelSerializer):
    captain = serializers.ReadOnlyField(source='captain.username')
    questCount = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = ['id', 'name', 'captain', 'questCount']

    def get_questCount(self, obj):
        return obj.quest_set.count()


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(allow_null=True, required=False)
    class Meta:
        model = Profile
        fields = '__all__'
        
class ParticipantSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'profile']

class QuestSerializer(serializers.ModelSerializer):
    captain = ParticipantSerializer(read_only=True)
    captain_id = serializers.PrimaryKeyRelatedField(source='captain', queryset=User.objects.all(), write_only=True)
    participants = ParticipantSerializer(many=True, read_only=True)
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all())
    comments = serializers.SerializerMethodField()

    def get_comments(self, obj):
        comments = Comment.objects.filter(quest=obj)
        return CommentSerializer(comments, many=True).data

    class Meta:
        model = Quest
        fields = ('id', 'title', 'content', 'captain', 'captain_id', 'participants', 'topic', 'public', 'comments', 'created_at', 'updated_at')

    def create(self, validated_data):
        captain = validated_data.pop('captain')
        quest = Quest.objects.create(captain=captain, **validated_data)
        quest.participants.add(captain)
        quest.save()
        return quest



class UserSerializer(serializers.ModelSerializer):
    created_quests = QuestSerializer(many=True, read_only=True)
    participating_in = serializers.StringRelatedField(many=True)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'created_quests', 'participating_in', 'profile']

class CommentSerializer(serializers.ModelSerializer):
    user = ParticipantSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'body']
