#Back-end Down To Earth

Open postgresql terminal and create postgrest db

	$ create database downtoearth;

Type \q and then press ENTER to quit psql.

Then just go to project folder and run the migration files to create localhost db

	$ rake db:migrate

##Localhost test
###POST new body-scan
	curl --data "user_id=1&sensor=glucometer&value=66&UOM=mgdl&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw

##Heroku (connect to)

###Repo init
	git init #first time only
	#.git folder rename (from copy to orignal)
	git push heroku master

###Run db migrations
	heroku run rake --trace db:migrate

###WEB API
	https://downtoearth-backend.herokuapp.com

###Logs: view live shell log
	heroku logs --tail --app downtoearth-backend




















HEROKU_POSTGRESQL_BLUE_URL

Show models

http://localhost:4567/models

http://sinatra-activerecord-heroku-ma.herokuapp.com/models

#HEROKU RECORD

#################################################################
#Deploying code

 git add .
 git commit -m "my first commit"

git push heroku master

#################################################################
Your app, sinatra-activerecord-heroku-ma, has been created.

App URL:
http://sinatra-activerecord-heroku-ma.herokuapp.com/

Git URL:
git@heroku.com:sinatra-activerecord-heroku-ma.git

Use the following code to set up your app for local development:

git clone git@heroku.com:sinatra-activerecord-heroku-ma.git -o heroku
########################################################################
########################################################################
########################################################################
#HEROKU DATABASE UPDATE
########################################################################

heroku run rake --trace db:migrate

