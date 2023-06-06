from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuestSerializer
from .models import Quest


# Create your views here.
def index(request):
    context = { }
    return render(request, "index.html", context)
    
@api_view(['GET', 'POST'])
def quest(request):
    if request.method == 'GET':
        quest = Quest.objects.all()
        serializer = QuestSerializer(quest, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)  # Add the creator here
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def quest_detail(request, pk):
    try:
        quest = Quest.objects.get(pk=pk)
    except Quest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestSerializer(quest)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        quest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({
            'message': 'Login successful.',
            'user': {
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response({'message': 'Invalid credentials.'}, status=401)


@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'message': 'Username and password are required.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'message': 'User with this username already exists.'}, status=400)

    user = User.objects.create_user(username=username, email=username, password=password) # using username as email here.
    user.save()
    return Response({'message': 'Signup successful.'})


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful.'})

@api_view(['GET'])
@login_required
def get_user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

