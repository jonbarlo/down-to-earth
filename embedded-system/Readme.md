#Linux OS embedded system

- testing ruby-sinatra web app

##Getting RVM

	curl -L https://get.rvm.io | bash -s stable --ruby

#Pre-requisites for embedded-system
	sudo gem install rdoc
	sudo gem install bundle
	
#Run embedded-system
	
##Install all dependencies
	
	bundle install

##Run the app
	
	shotgun app.rb
