from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=100)
    year = models.IntegerField()
    rated = models.CharField(max_length=10)
    released = models.DateField()
    runtime = models.CharField(max_length=10)
    genre = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    writer = models.CharField(max_length=100)
    actors = models.CharField(max_length=100)
    plot = models.TextField()
    language = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    awards = models.CharField(max_length=100)
    poster = models.URLField()
    metascore = models.IntegerField()
    imdb_rating = models.FloatField()
    imdb_votes = models.IntegerField()
    imdb_id = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    dvd = models.DateField()
    box_office = models.CharField(max_length=100)
    production = models.CharField(max_length=100)
    website = models.URLField()

    def __str__(self):
        return self.title