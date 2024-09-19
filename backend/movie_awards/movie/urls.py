from django.urls import path

from . import views

urlpatterns = [
    path('fav_movies/', views.fav_movies),
    path('search_movie_title/', views.search_movies_by_title),
    path('search_movie_id/', views.search_movies_by_id),
]