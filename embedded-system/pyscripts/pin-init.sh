#echo Number of arguments passed: $# ' -> echo Number of arguments passed: $#' 
#set pin value
gpio -g mode $1 in
#echo $1