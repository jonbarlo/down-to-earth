#Linux OS embedded system

- system was done using a ruby-sinatra web app, running as a embedded system on RaspbianOS for Raspberry Pi B+ model

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
