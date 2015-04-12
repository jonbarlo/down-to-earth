import time
import RPi.GPIO as GPIO
import sys, json

#GPIO22
RCpin=22

def ReadGPIOPin(pinNo):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pinNo, GPIO.IN)
    # This takes about 1 millisecond per loop cycle
    if (GPIO.input(pinNo) == GPIO.LOW):
        return 0;
    else
        return 1;

#
# RETURN/PRINT READ VALUES
#
# return processing result
print json.dumps({'read-electromyograph_read_value':ReadGPIOPin(RCpin)})