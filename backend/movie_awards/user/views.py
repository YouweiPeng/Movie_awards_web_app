from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from rest_framework.response import Response
API_KEY = settings.API_KEY
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.method == 'POST':
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([AllowAny])
def user_signup(request):
    
    username = request.data.get("username")
    password = request.data.get("password")
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists, please try another username'}, status=status.HTTP_400_BAD_REQUEST)
    user = User(username=username, password=make_password(password))
    user.save()

    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

    

    

