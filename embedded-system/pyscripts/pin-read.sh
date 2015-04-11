#echo Number of arguments passed: $# ' -> echo Number of arguments passed: $#' 
#set pin value
gpio -g read $1
echo $1