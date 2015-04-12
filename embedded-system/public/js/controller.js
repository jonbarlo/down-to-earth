//var app = angular.module('myapp', ['ngAnimate']);
        var app = angular.module('myapp', []);

        app.controller('Ctrl', function($scope, $interval, $http){

              //$scope.cedula_value = 0;
              $scope.glucometer_read_value = 0;
              $scope.oximeter_read_value_spo2 = 0;
              $scope.oximeter_read_value_prbpm = 0;

              $scope.button_leer_glucometro = function() {
                      console.log("glucometer.json")
                      $http.get('/glucometer.json').success(function(json_data) {
                         //
                         //LOAD ANGULAR CONTROLLER'S PROPS
                         //
                         $scope.glucometer_read_value = json_data.glucometer_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_oximetro = function() {
                      console.log("oximeter.json")
                      $http.get('/oximeter.json').success(function(json_data) {
                         //
                         //LOAD ANGULAR CONTROLLER'S PROPS
                         //
                         $scope.oximeter_read_value_spo2 = json_data.oximeter_read_value_spo2;
                         $scope.oximeter_read_value_prbpm = json_data.oximeter_read_value_prbpm;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_temperatura = function() {
                      console.log("temperature.json")
                      $http.get('/temperature.json').success(function(json_data) {
                        //
                        // COPY FROM RUBY SESSION TO ANGULAR CONTEXT
                        //
                         $scope.temperature_read_value = json_data.temperature_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_temperatura_env = function() {
                      console.log("temperature-env.json")
                      $http.get('/temperature-env.json').success(function(json_data) {
                        //
                        // COPY FROM RUBY SESSION TO ANGULAR CONTEXT
                        //
                         $scope.temperature_env_read_value = json_data.temperature_env_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_saliva_ph = function() {
                      console.log("saliva-ph.json")
                      $http.get('/saliva-ph.json').success(function(json_data) {
                        //
                        // COPY FROM RUBY SESSION TO ANGULAR CONTEXT
                        //
                         $scope.saliva_ph_read_value = json_data.saliva_ph_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_electrocardiograph = function() {
                      console.log("electrocardiograph.json")
                      $http.get('/electrocardiograph.json').success(function(json_data) {
                        //
                        // COPY FROM RUBY SESSION TO ANGULAR CONTEXT
                        //
                         $scope.electrocardiograph_read_value = json_data.electrocardiograph_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_electromyograph = function() {
                      console.log("electromyograph.json")
                      $http.get('/electromyograph.json').success(function(json_data) {
                        //
                        // COPY FROM RUBY SESSION TO ANGULAR CONTEXT
                        //
                         $scope.electromyograph_read_value = json_data.electromyograph_read_value;
                         console.log(json_data);
                      });
              };

              $scope.button_leer_blood_pressure = function() {
                      console.log("blood-pressure.json")
                      $http.get('/blood-pressure.json').success(function(json_data) {
                         //
                         //LOAD ANGULAR CONTROLLER'S PROPS
                         //
                         $scope.blood_pressure_read_value = json_data.blood_pressure_read_value;
                         $scope.systolic_pressure_read_value = json_data.blood_pressure_read_value_sys;
                         $scope.diastolic_pressure_read_value = json_data.blood_pressure_read_value_dia;
                         console.log(json_data);
                      });
              };

              $scope.button_send_body_scan = function(user_id) {
                if(user_id == undefined)
                {
                  alert("Missing user_id");
                  return false;
                }
                else
                {
                  console.log("user_id..."+user_id);
                }
                //
                $scope.user_id_value = user_id;
                  // Simple POST request example (passing data) :
                    //curl --data "user_id=1&sensor=glucometer&value=1&UOM=mgdl&created_at=04/11/2015"
                    //https://downtoearth-backend.herokuapp.com/bodyscan/create/raw
                    var today_date = new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear();
                    var fileCounter = 0;
                    var totalScans = 11;//eleven diferentes values
                  $http.get('/bodyscan-server-prepare/'+user_id+"/body-temperature/"+$scope.temperature_read_value+"/C/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "body-temperature scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });

                  $http.get('/bodyscan-server-prepare/'+user_id+"/enviroment-temperature/"+$scope.temperature_env_read_value+"/C/"+today_date).
                    success(function(data, status, headers, config) {
                      // this callback will be called asynchronously
                      // when the response is available
                      //alert("enviroment-temperature scan sent!")
                      $scope.files_been_sent_messages = "enviroment-temperature scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                  $http.get('/bodyscan-server-prepare/'+user_id+"/glucometer/"+$scope.glucometer_read_value+"/mgdl/"+today_date).
                    success(function(data, status, headers, config) {
                      // this callback will be called asynchronously
                      // when the response is available
                      //alert("glucometer scan sent!")
                      $scope.files_been_sent_messages = "glucometer scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                    $http.get('/bodyscan-server-prepare/'+user_id+"/saliva-ph/"+$scope.saliva_ph_read_value+"/ph/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "saliva-ph scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
//
                    $http.get('/bodyscan-server-prepare/'+user_id+"/electromyograph/"+$scope.electromyograph_read_value+"/EMG/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "electromyograph scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });

                    $http.get('/bodyscan-server-prepare/'+user_id+"/electrocardiograph/"+$scope.electrocardiograph_read_value+"/ECG/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "electrocardiograph scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
//
                    $http.get('/bodyscan-server-prepare/'+user_id+"/oximeter_prbpm/"+$scope.oximeter_read_value_prbpm+"/prbpm/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "oximeter_prbpm scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                    $http.get('/bodyscan-server-prepare/'+user_id+"/oximeter_spo2/"+$scope.oximeter_read_value_spo2+"/spo2/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "oximeter_spo2 scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
//
                    $http.get('/bodyscan-server-prepare/'+user_id+"/blood_pressure/"+$scope.blood_pressure_read_value+"/p/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "blood pressure scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                    $http.get('/bodyscan-server-prepare/'+user_id+"/diastolic_pressure/"+$scope.diastolic_pressure_read_value+"/DIA/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "diastolic_pressure scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                    $http.get('/bodyscan-server-prepare/'+user_id+"/systolic_pressure/"+$scope.systolic_pressure_read_value+"/SYS/"+today_date).
                    success(function(data, status, headers, config) {
                      $scope.files_been_sent_messages = "systolic_pressure scan sent!";
                      fileCounter++;
                      if(fileCounter==totalScans)
                          alert("Full Body-Scan sent. Total of ("+totalScans+")")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
                    $scope.files_been_sent_messages = "";
              };

        });