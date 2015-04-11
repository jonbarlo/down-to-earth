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

              $scope.button_enviar_informe = function(numero_cedula) {
                if(numero_cedula == undefined)
                {
                  alert("Por favor ingrese su numero de cédula");
                  return false;
                }
                else
                {
                  console.log("cedula ingresada..."+numero_cedula);
                }
                //
                $scope.cedula_value = numero_cedula;
                  // Simple POST request example (passing data) :
                  $http.get('/enviar-reporte/'+numero_cedula+"/"+$scope.glucometer_read_value+"/"+$scope.oximeter_read_value_spo2+"/"+$scope.oximeter_read_value_prbpm+"/"+$scope.temperature_read_value).
                    success(function(data, status, headers, config) {
                      // this callback will be called asynchronously
                      // when the response is available
                      alert("Escaneo Registrado con Éxito!")
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                      alert("Error: "+data)
                    });
              };

        });