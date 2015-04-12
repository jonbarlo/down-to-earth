# called python script
 
import sys, json
from random import randint

# return processing result
print json.dumps({'blood_pressure_read_value':randint(66,100),
	'blood_pressure_read_value_sys':randint(5,36),
	'blood_pressure_read_value_dia':randint(40,59)})