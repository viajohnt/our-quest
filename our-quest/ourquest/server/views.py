from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuestSerializer
from .models import Quests

# Create your views here.
def index(request):
    context = { }
    return render(request, "index.html", context)
    
@api_view(['GET', 'POST'])
def quest(request):
    if request.method == 'GET':
        quest = Quests.objects.all()
        serializer = QuestSerializer(quest, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def quest_detail(request, pk):
    try:
        quest = Quests.objects.get(pk=pk)
    except Quests.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        quest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)