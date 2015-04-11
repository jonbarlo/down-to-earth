import time
import RPi.GPIO as GPIO
import sys, json

#TODO: define if keep/delete params
RCpin=17

#Tests whether wter is present.
# returns 0 for dry
# returns 1 for wet
# tested to work on pin 18 
def RCtime(RCpin):
    reading = 0
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RCpin, GPIO.OUT)
    GPIO.output(RCpin, GPIO.LOW)
    time.sleep(0.1) 
    GPIO.setup(RCpin, GPIO.IN)
    # This takes about 1 millisecond per loop cycle
    while True:
        if (GPIO.input(RCpin) == GPIO.LOW):
            reading += 1
        if reading >= 1000:
            return 0
        if (GPIO.input(RCpin) != GPIO.LOW):
            return 1

#
# RETURN/PRINT READ VALUES
#
# return processing result
print json.dumps({'glucometer_read_value':RCtime(RCpin)})

#while True:
	#if io.input(door_pin):
		#print("door_pin")
	#time.sleep(1)