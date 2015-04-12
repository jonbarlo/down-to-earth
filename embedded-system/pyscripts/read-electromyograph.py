import subprocess
import os
import time
import json
from random import randint
from subprocess import Popen, PIPE

#GPIO22
RCpin=22

def ReadGPIOPin(pinNo):
	filename = "pin-init.sh"
	filepath = os.path.dirname(os.path.abspath(__file__))
	subprocess.call(["bash" ,filepath + "/" + filename, pinNo])
	filename = "pin-read.sh"
	rc = subprocess.check_output(["bash" , filepath + "/" + filename, pinNo])
	return rc

#
# RETURN/PRINT READ VALUES
#
# return processing result
print json.dumps({'read_electromyograph_read_value':ReadGPIOPin(RCpin)})