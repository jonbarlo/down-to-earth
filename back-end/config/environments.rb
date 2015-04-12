#These Settings Establish the Proper Database Connection for Heroku Postgres
#The environment variable DATABASE_URL should be in the following format:
# => postgres://{user}:{password}@{host}:{port}/path
#This is automatically configured on Heroku, you only need to worry if you also
#want to run your app locally
configure :development do
	db = URI.parse(ENV['DATABASE_URL'] || 'postgres://localhost/downtoearth')

	ActiveRecord::Base.establish_connection(
			:adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
			:host     => db.host,
			:username => db.user,
			:password => db.password,
			:database => db.path[1..-1],
			:encoding => 'utf8'
	)
end

configure :production do
	db = URI.parse(ENV['DATABASE_URL'] || 'postgres://iwpasgdyhkutds:9DVCAQOb4jvWFVlEO2oZYqHVqI@ec2-50-19-236-178.compute-1.amazonaws.com:5432/df24ip9j9iafc')

	ActiveRecord::Base.establish_connection(
			:adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
			:host     => db.host,
			:username => db.user,
			:password => db.password,
			:database => db.path[1..-1],
			:encoding => 'utf8'
	)
end