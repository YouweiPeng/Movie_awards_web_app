## This is the Movie award web app code challenge project

This project is a code challenge project for a movie award web app. The project is built using Django and Django Rest Framework. The project is a simple web app that allows users to nominate movies for awards. The project has the following features:

## 1. Movie Search:
- Users can search movie by title or ID. The search is done using the OMDB API.
- Users can view the search results and click on a result for more details.
- Display specific fields of searched movie data 

## 2. Save Favorite Movies:
- Users should be able to save movies from the search results to their
personal favorites list.
- A user can save up to five movies. Once the limit is reached, notify the
user.
- Users cannot save the same movie twice.
- Display specific fields of saved movie data

## 3. View & Manage Favorites:
- Users can view their saved movies.
- Allow users to remove movies from their favorites list.
- Add login/logout functionality with user registration to allow users to
manage their own movie list.

## 4. UI/UX:
- The web app is responsive and user-friendly.
- Display validation or error messages
- Display loading when fetching data
- Animations and transitions

# To start the project, follow the steps below:

1. Clone the repository
2. go to backend repository and then do the following:
- Create a virtual environment
- Install the requirements using the command `pip install -r requirements.txt`
- Run make migrations using the command `python manage.py makemigrations`
- Run the migrations using the command `python manage.py migrate`
- Run the server using the command `python manage.py runserver`
3. go to frontend repository and then do the following:
- Install the requirements using the command `npm install`
- Run the server using the command `npm run dev`

