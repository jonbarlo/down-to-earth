# called python script
import sys, json
import Adafruit_DHT
# Sensor should be set to Adafruit_DHT.DHT11,
# Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.
sensor = Adafruit_DHT.DHT22

def DHT_22_READ_TH(gpio):
	# Try to grab a sensor reading.  Use the read_retry method which will retry up
	# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
	humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio)
	# Note that sometimes you won't get a reading and
	# the results will be null (because Linux can't
	# guarantee the timing of calls to read the sensor).  
	# If this happens try again!
	if humidity is not None and temperature is not None:
		return temperature #("{0:0.2f}".format(temperature))
	else:
		return 0

#
#
#
GPIO_4 = 4
temperature = DHT_22_READ_TH(GPIO_4)
# return processing result
print json.dumps({'temperature_read_value':temperature})
#
#EOF
#