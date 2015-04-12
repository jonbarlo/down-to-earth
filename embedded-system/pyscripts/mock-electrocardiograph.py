# called python script
 
import sys, json
from random import randint

# return processing result
#print json.dumps({'electromyograph_read_value':[randint(75,100),randint(101,150),randint(151,200),randint(201,250),randint(251,300),randint(301,400)]})
print json.dumps({'electrocardiograph_read_value':[randint(0,1)]})