#Back-end Down To Earth

Open postgresql terminal and create postgrest db

	$ create database downtoearth;

Type \q and then press ENTER to quit psql.

Then just go to project folder and run the migration files to create localhost db

	$ rake db:migrate

##Localhost test
###POST new body-scan

####localhost
	curl --data "user_id=1&sensor=body-temperature&value=36&UOM=C&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw
	curl --data "user_id=1&sensor=enviroment-temperature&value=32&UOM=C&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw
	curl --data "user_id=1&sensor=glucometer&value=66&UOM=mgdl&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw
	curl --data "user_id=1&sensor=saliva-ph&value=6.5&UOM=ph&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw
	curl --data "user_id=2&sensor=saliva-ph&value=6.5&UOM=ph&created_at=04/11/2015" http://127.0.0.1:9393/bodyscan/create/raw

####live
	curl --data "user_id=1&sensor=glucometer&value=1&UOM=mgdl&created_at=04/11/2015" https://downtoearth-backend.herokuapp.com/bodyscan/create/raw

	curl --data "user_id=1&sensor=glucometer&value=888&UOM=mgdl&created_at=Sun Apr 12 2015 05:12:35 GMT-0600 (CST)" https://downtoearth-backend.herokuapp.com/bodyscan/create/raw

user_id: 1 sensor: glucometer value: 140 UOM: mgdl created_at: 

##Heroku (connect to backend for pushing)

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

