require 'sinatra'
require 'sinatra/activerecord'
require './config/environments' #database configuration
require './models/bodyscan'        #Model class
require './models/user'        #Model class

get '/' do
	erb :index
end

get '/user/create' do
	erb :'user/create'
end

post '/user/create' do
	@model = User.new(params[:user])
	puts "---------------------------------"
	puts params[:user]
	puts "---------------------------------"
	if @model.save
		redirect '/user/all'
	else
		"Sorry, there was an error!"
	end
end

get '/user/all' do
	@models = User.all
	erb :'user/all'
end

get '/user/all/json' do
  content_type :json
  	@models = User.all
  	puts "========================================"
	puts "getting all users..."
	puts @models.to_json
	puts "========================================"
	@models.to_json
	#{ 	:id => @model.id, :firstname => @model.firstname,
	#	:lastname => @model.lastname, :nation => @model.nation, 
	#	:birthday => @model.birthday
	#}.to_json
end

get '/bodyscan/create' do
	erb :'bodyscan/create'
end

post '/bodyscan/create/raw' do
	puts "creating raw object via web api call"
	puts "---------------------------------"
	puts "user_id: #{params[:user_id]} sensor: #{params[:sensor]} value: #{params[:value]} UOM: #{params[:UOM]} created_at: #{params[:created_at]}"
	puts "---------------------------------"
	@model = BodyScan.new
	@model.user_id = params[:user_id]
	@model.sensor = params[:sensor]
	@model.value = params[:value]
	@model.UOM = params[:UOM]
	@model.created_at = params[:created_at]
	puts "---------------------------------"
	puts @model
	puts "---------------------------------"
	if @model.save
		redirect '/bodyscan/all'
	else
		"Sorry, there was an error!"
	end
end

post '/bodyscan/create' do
	@model = BodyScan.new(params[:bodyscan])
	puts "---------------------------------"
	puts params[:bodyscan]
	puts "---------------------------------"
	if @model.save
		redirect '/bodyscan/all'
	else
		"Sorry, there was an error!"
	end
end

get '/bodyscan/all' do
	@models = BodyScan.all
	erb :'bodyscan/all'
end

get '/bodyscan/all/json' do
  content_type :json
  	@models = BodyScan.all
  	puts "========================================"
	puts "getting all bodyscan..."
	puts @models.to_json
	puts "========================================"
	@models.to_json
end

after do
  # Close the connection after the request is done so that we don't
  # deplete the ActiveRecord connection pool.
  ActiveRecord::Base.connection.close
end
