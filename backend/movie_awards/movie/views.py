from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import Movie, UserFavorite
from django.conf import settings
from rest_framework.permissions import AllowAny
from .serializers import MovieSerializer
API_KEY = settings.API_KEY
import requests

@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
# Must provide username and password in the request header using Basic Authentication
def fav_movies(request):
    user = request.user
    if request.method == 'GET':
        fav_movies = UserFavorite.objects.filter(user=user)
        movies = [fav_movie.movie for fav_movie in fav_movies]
        serialized_movies = MovieSerializer(movies, many=True)
        return Response(serialized_movies.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        request_movie = request.data['movie']
        try:
            movie = Movie.objects.get(Title=request_movie['Title'])
        except Movie.DoesNotExist:
            movie = Movie.objects.create(
                Title = request_movie.get('Title', ''),
                Year = request_movie.get('Year', ''),
                Rated = request_movie.get('Rated', ''),
                Released = request_movie.get('Released', ''),
                Runtime = request_movie.get('Runtime', ''),
                Genre = request_movie.get('Genre', ''),
                Director = request_movie.get('Director', ''),
                Writer = request_movie.get('Writer', ''),
                Actors = request_movie.get('Actors', ''),
                Plot = request_movie.get('Plot', ''),
                Language = request_movie.get('Language', ''),
                Country = request_movie.get('Country', ''),
                Awards = request_movie.get('Awards', ''),
                Poster = request_movie.get('Poster', ''),
                Metascore = request_movie.get('Metascore', None),
                imdb_rating = request_movie.get('imdbRating', None),
                imdb_votes = request_movie.get('imdbVotes', None),
                imdbID = request_movie.get('imdbID', ''),
                Type = request_movie.get('Type', ''),
                DVD = request_movie.get('DVD', None),
                BoxOffice = request_movie.get('BoxOffice', ''),
                Production = request_movie.get('Production', ''),
                Website = request_movie.get('Website', '')
            )

        try:
            fav_movie = UserFavorite.objects.get(user=user, movie=movie)
            return Response({'error': 'Movie already in favorites'}, status=status.HTTP_400_BAD_REQUEST)
        except UserFavorite.DoesNotExist:
            UserFavorite.objects.create(user=user, movie=movie)
            return Response({'message': f'{movie.Title} added to favorites of {user.username}'}, status=status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        try:
            movie = Movie.objects.get(Title=request.data['Title'])
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
        try:
            fav_movie = UserFavorite.objects.get(user=user, movie=movie)
        except UserFavorite.DoesNotExist:
            return Response({'error': 'Movie not in favorites'}, status=status.HTTP_400_BAD_REQUEST)
        fav_movie.delete()
        fav_movies = UserFavorite.objects.filter(movie=movie)
        if not fav_movies: # if no one likes the movie, just delete it from the database
            movie.delete()
        return Response({'message': f'{movie.Title} removed from favorites of {user.username}'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def search_movies_by_title(request):
    if request.method == 'POST': # By title
        title = request.data['title']
        url = f'http://www.omdbapi.com/?apikey={API_KEY}&s={title}'
        response = requests.get(url)
        data = response.json()
        if data['Response'] == 'False':
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def search_movies_by_id(request):
    if request.method == 'POST': # By IMDB ID
        imbd_id = request.data['imdb_id']
        url = f'http://www.omdbapi.com/?apikey={API_KEY}&i={imbd_id}'
        response = requests.get(url)
        data = response.json()
        if data['Response'] == 'False':
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(data, status=status.HTTP_200_OK)