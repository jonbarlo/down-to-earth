# called python script
 
import sys, json
from random import randint

# return processing result
print json.dumps({'glucometer_read_value':randint(0,1)})