# called python script
 
import sys, json
from random import randint

# return processing result
#print json.dumps({'electromyograph_read_value':[randint(1,1.5),randint(1.5,2),randint(2.5,3),randint(3.5,4),randint(4.5,5)]})
print json.dumps({'electromyograph_read_value':[randint(0,1)]})