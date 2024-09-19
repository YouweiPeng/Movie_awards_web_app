from django.db import models
from user.models import User
# Create your models here.

class Movie(models.Model):
    Title = models.CharField(max_length=100, unique=True)
    Year = models.CharField(max_length=100) # some of the years are '2016–2018'
    Rated = models.CharField(max_length=10)
    Released = models.CharField(max_length=100)
    Runtime = models.CharField(max_length=10)
    Genre = models.CharField(max_length=100)
    Director = models.CharField(max_length=100)
    Writer = models.CharField(max_length=100)
    Actors = models.CharField(max_length=100)
    Plot = models.TextField()
    Language = models.CharField(max_length=100)
    Country = models.CharField(max_length=100)
    Awards = models.CharField(max_length=100)
    Poster = models.URLField()
    Metascore = models.CharField(max_length=100)
    imdb_rating = models.CharField(max_length=100)
    imdb_votes = models.CharField(max_length=100)
    imdbID = models.CharField(max_length=20)
    Type = models.CharField(max_length=20, default='N/A', null=True)
    DVD = models.CharField(max_length=100, default='N/A', null=True)
    BoxOffice = models.CharField(max_length=100, default='N/A', null=True)
    Production = models.CharField(max_length=100, default='N/A', null=True)
    Website = models.URLField()
    def __str__(self):
        return self.Title

class UserFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} likes {self.movie.Title}'