# called python script
 
import sys, json
from random import randint

# return processing result
print json.dumps({'oximeter_is_touch':randint(0,1), 
	'oximeter_read_value_spo2':randint(85,98), 
	'oximeter_read_value_prbpm':randint(55,124)})