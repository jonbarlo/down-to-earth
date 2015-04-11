# called python script
 
import sys, json
from random import randint

# return processing result
print json.dumps({'temperature_read_value':randint(-15,36)})