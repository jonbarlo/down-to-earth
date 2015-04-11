import subprocess
import os
import time
import json
from random import randint
from subprocess import Popen, PIPE

filename = "pin-init.sh"
filepath = os.path.dirname(os.path.abspath(__file__))
#print "executing " + filepath + "/" + filename + " ... "
subprocess.call(["bash" ,filepath + "/" + filename, "27"])

#
#
#
#filename = "pin-read.sh"
#p = Popen(["bash" , filepath + "/" + filename, "27"], stdin=PIPE, stdout=PIPE, stderr=PIPE)
#output, err = p.communicate(b"input data that is passed to subprocess' stdin")
#rc = p.returncode
#
#
#
filename = "pin-read.sh"
rc = subprocess.check_output(["bash" , filepath + "/" + filename, "27"])
#print "exec commmand return value #{rc}"
#
#
#
print json.dumps({'oximeter_is_touch':rc,
    'oximeter_read_value_spo2':randint(85,98), 
    'oximeter_read_value_prbpm':randint(55,124)})