require 'sinatra'
require 'json'
require 'open-uri'
require 'net/http'
require 'sinatra/contrib'

config_file 'configuration/global.yml'
##
## PYTHON LOADERS TO RUBY SESSION
##
def Glucometer_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-glucometer.py")
	else
		result = IO.popen("python pyscripts/mock-glucometer.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	if parsed["glucometer_read_value"] == 1 then
		parsed["glucometer_read_value"] = "Ingrese muestra"
	else
		parsed["glucometer_read_value"] = Random.rand(2...159)
	end
	session["glucometer_read_value"] = parsed["glucometer_read_value"]
end

def oximeter_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-oximeter.py")
	else
		result = IO.popen("python pyscripts/mock-oximeter.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	#
	# TODO CLEAN LAST CHARS ON JSON RESPONSE
	#
	if parsed["oximeter_is_touch"][0] == '0' then
		session["oximeter_read_value_spo2"] = "Coloque su dedo en el sensor"
		session["oximeter_read_value_prbpm"] = "N/A"
	else
		session["oximeter_read_value_spo2"] = parsed["oximeter_read_value_spo2"]
		session["oximeter_read_value_prbpm"] = parsed["oximeter_read_value_prbpm"]
	end
end

def temperature_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-dht22.py")
	else
		result = IO.popen("python pyscripts/mock-temperature.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	session["temperature_read_value"] = parsed["temperature_read_value"]
end

def temperature_env_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-dht22.py")
	else
		result = IO.popen("python pyscripts/mock-temperature.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	session["temperature_env_read_value"] = parsed["temperature_read_value"]
end

def saliva_ph_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-glucometer.py")
	else
		result = IO.popen("python pyscripts/mock-glucometer.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	if parsed["glucometer_read_value"] == 1 then
		parsed["glucometer_read_value"] = "Ingrese muestra"
	else
		parsed["glucometer_read_value"] = Random.rand(2...159)
	end
	session["saliva_ph_read_value"] = parsed["glucometer_read_value"]
end

def electrocardiograph_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-electrocardiograph.py")
	else
		result = IO.popen("python pyscripts/mock-electrocardiograph.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	if parsed["electrocardiograph_read_value"] == 1 then
		parsed["electrocardiograph_read_value"] = "Invalid Read"
	else
		parsed["electrocardiograph_read_value"] = [Random.rand(2...159), Random.rand(2...159), Random.rand(2...159)]
	end
	session["electrocardiograph_read_value"] = parsed["electrocardiograph_read_value"]
end

def electromyograph_load_to_session()
	if settings.production_enviroment then
		result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-electromyoiograph.py")
	else
		result = IO.popen("python pyscripts/mock-electromyograph.py")
	end
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	if parsed["electromyograph_read_value"] == 1 then
		parsed["electromyoiograph_read_value"] = "Invalid Read"
	else
		parsed["electromyograph_read_value"] = [Random.rand(2...159), Random.rand(2...159), Random.rand(2...159)]
	end
	session["electromyograph_read_value"] = parsed["electromyograph_read_value"]
end

def blood_pressure_load_to_session()
	#if settings.production_enviroment then
	#	result = IO.popen("sudo python /home/pi/Desktop/GIT/HospiApp/pyscripts/read-blood-pressure.py")
	#else
	#	result = IO.popen("python pyscripts/mock-blood-pressure.py")
	#end
	result = IO.popen("python pyscripts/mock-blood-pressure.py")
	server_response = result.gets
	print "python call success, response ---> #{server_response}"
	#session["value"] = server_response
	parsed = JSON.parse(server_response)
	session["blood_pressure_read_value"] = parsed["blood_pressure_read_value"]
	session["blood_pressure_read_value_sys"] = parsed["blood_pressure_read_value_sys"]
	session["blood_pressure_read_value_dia"] = parsed["blood_pressure_read_value_dia"]
end
##
## END PYTHON LOADERS TO RUBY SESSION
##

##
## BEGIN JSON WEB API
##

get '/glucometer.json' do
  content_type :json

  	puts "========================================"
	puts "python glucometer script call && json parse"
	Glucometer_load_to_session()
	puts "========================================"
  	{ :glucometer_read_value => session["glucometer_read_value"] }.to_json
end

get '/oximeter.json' do
  content_type :json

  	puts "========================================"
	puts "python oximeter script call && json parse"
	oximeter_load_to_session()
	puts "========================================"
  	{ :oximeter_read_value_spo2 => session["oximeter_read_value_spo2"],
  		:oximeter_read_value_prbpm => session["oximeter_read_value_prbpm"] }.to_json
end

get '/temperature.json' do
  content_type :json

  	puts "========================================"
	puts "python temperature script call && json parse"
	temperature_load_to_session()
	puts "========================================"
  	{ :temperature_read_value => session["temperature_read_value"] }.to_json
end

get '/temperature-env.json' do
  content_type :json

  	puts "========================================"
	puts "python temperature script call && json parse"
	temperature_env_load_to_session()
	puts "========================================"
  	{ :temperature_env_read_value => session["temperature_env_read_value"] }.to_json
end

get '/saliva-ph.json' do
  content_type :json

  	puts "========================================"
	puts "python saliva_ph script call && json parse"
	saliva_ph_load_to_session()
	puts "========================================"
  	{ :saliva_ph_read_value => session["saliva_ph_read_value"] }.to_json
end

get '/electrocardiograph.json' do
  content_type :json

  	puts "========================================"
	puts "python electrocardiograph script call && json parse"
	electrocardiograph_load_to_session()
	puts "========================================"
  	{ :electrocardiograph_read_value => session["electrocardiograph_read_value"] }.to_json
end

get '/electromyograph.json' do
  content_type :json

  	puts "========================================"
	puts "python electromyograph script call && json parse"
	electromyograph_load_to_session()
	puts "========================================"
  	{ :electromyograph_read_value => session["electromyograph_read_value"] }.to_json
end

get '/blood-pressure.json' do
  content_type :json
  	puts "========================================"
	puts "python blood-pressure script call && json parse"
	blood_pressure_load_to_session()
	puts "========================================"
  	{ :blood_pressure_read_value => session["blood_pressure_read_value"],
  		:blood_pressure_read_value_sys => session["blood_pressure_read_value_sys"],
  		:blood_pressure_read_value_dia => session["blood_pressure_read_value_dia"] }.to_json
end
##
## END JSON WEB API
##

##
## BEGIN SAVE ACTIONS
##
get '/bodyscan-server-prepare/:user_id/:sensor/:value/:UOM/:created_at' do
	puts "creating raw object via web api call"
	puts "---------------------------------"
	puts "user_id: #{params[:user_id]} sensor: #{params[:sensor]} value: #{params[:value]} UOM: #{params[:UOM]} created_at: #{params[:created_at]}"
	puts "---------------------------------"
	@user_id = params[:user_id]
	@sensor = params[:sensor]
	@value = params[:value]
	@UOM = params[:UOM]
	@created_at = params[:created_at]
	puts "---------------------------------"
	puts @created_at
	puts "---------------------------------"
	puts "sending body scan to https://downtoearth-backend.herokuapp.com/bodyscan/create/raw"
#curl --data "user_id=1&sensor=glucometer&value=1&UOM=mgdl&created_at=04/11/2015"
#
	#response = open("http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-pacienteG/#{params[:numero_cedula]}/temperatura/#{params[:temperature_read_value]}/C").read
	#puts response
	uri = URI('https://downtoearth-backend.herokuapp.com/bodyscan/create/raw')
	res = Net::HTTP.post_form(uri, 'user_id' => @user_id, 'sensor' => @sensor,
		'value' => @value, 'UOM' => @UOM, 'created_at' => @created_at)
	puts res.body
	puts "END!!!!"
end

get '/prepare-full-body-scan/:user_id/:glucometro_value/:oximeter_read_value_spo2/:oximeter_read_value_prbpm/:temperature_read_value' do
	puts "========================================"
	if params[:glucometro_value].to_i != 0 then
		puts "saving glucometer...#{params[:glucometro_value]}"
		response = open("http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-pacienteG/#{params[:numero_cedula]}/glucometro/#{params[:glucometro_value]}/mgdl").read
		puts response
	else
		puts "ignoring glucometer"
	end

	if params[:oximeter_read_value_spo2].to_i != 0 then
		puts "saving oximeter SpO2...#{params[:oximeter_read_value_spo2]}"
		response = open("http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-pacienteG/#{params[:numero_cedula]}/oximetro_spo2/#{params[:oximeter_read_value_spo2]}/spo2").read
		puts response
	else
		puts "ignoring oximeter SpO2"
	end

	if params[:oximeter_read_value_prbpm].to_i != 0 then
		puts "saving oximeter PRbpm...#{params[:oximeter_read_value_prbpm]}"
		response = open("http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-pacienteG/#{params[:numero_cedula]}/oximetro_prbpm/#{params[:oximeter_read_value_prbpm]}/prbpm").read
		puts response
	else
		puts "ignoring oximeter PRbpm"
	end

	if params[:temperature_read_value].to_i != 0 then
		puts "saving temperature C...#{params[:temperature_read_value]}"
		response = open("http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-pacienteG/#{params[:numero_cedula]}/temperatura/#{params[:temperature_read_value]}/C").read
		puts response
	else
		puts "ignoring temperature C"
	end
	
	puts "========================================"
	#//{}/mgdl
	#puts "internal url params----> cedula: #{params[:numero_cedula]} glucometro val: " + params[:glucometro_value]
	#post_parameters = {'cedula' => params[:numero_cedula], 'sensor' => 'glucometro', 'valor' => params[:glucometro_value], 'unidad' => 'mg/dl'}
	#url = URI.parse('http://hospitapp.aeonitgroup.com/Service1.svc/registrar-lectura-paciente')
	#puts "url----->"+url.to_s
	#resp, data = Net::HTTP.post_form(url, post_parameters)
	#puts resp.inspect
	#puts data.inspect
end

get '/digital-write/:pin_number/:pin_value' do
	if  params[:pin_value].to_s == 'true'
		this_value = 1
	else
		this_value = 0
	end
	this_pin = params[:pin_number].to_i
	result = IO.popen("bash /home/pi/Desktop/GIT/ruby-sinatra-rpi-test/pyscripts/pout-write.sh #{this_pin} #{this_value}")
end

##
## END 
##

##
## BEGIN VIEWS RETURN
##
get '/' do
	#######session["value"] = "session value! ===> ivan ---> on ruby & sinatra"
	@greeting = settings.greeting
	puts "========================================"
	puts @greeting
	puts "========================================"
	#result = IO.popen("bash /home/pi/Desktop/GIT/ruby-sinatra-rpi-test/pyscripts/pout-init.sh 16")
	#result = IO.popen("bash /home/pi/Desktop/GIT/ruby-sinatra-rpi-test/pyscripts/pout-init.sh 26")
	erb :index
end

get '/view/body-scan' do
	puts "========================================"
	erb :body_scan
end

get '/getdatagraphic/:user_id/:sensor' do
  @chartData=open("https://downtoearth-backend.herokuapp.com/bodyscan/#{params[:user_id]}/#{params[:sensor]}/json").read
  puts @chartData
  content_type 'application/json'
  @chartData.to_json
end

get '/view/medical-analysis' do
	puts "========================================"
	erb :medical_analisys
end

get '/view/muscle-performance' do
	puts "========================================"
	erb :muscle_performance
end

get '/view/muscle-performance/:user_id/:body_section' do
  @chartData=open("https://downtoearth-backend.herokuapp.com/bodyscan/#{params[:user_id]}/electromyograph/json").read
  puts @chartData
  content_type 'application/json'
  @chartData.to_json
  puts "view muscle region performance data"
end
##
## END
##
error do
   status 500 
   e = env['sinatra.error']
   url = request.url
   ip = request.ip
   backtrace = "Application error\n#{e}\n#{e.backtrace.join("\n")}"

   {    :message => e.message,
	    :path => url,
	    :ip => ip,
	    :timestamp => Time.new,
	    :type => "500",
	    :backtrace => backtrace}.to_json
end