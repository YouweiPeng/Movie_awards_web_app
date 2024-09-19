from django.contrib import admin
from .models import Movie, UserFavorite
# Register your models here.

admin.site.register(Movie)
admin.site.register(UserFavorite)
