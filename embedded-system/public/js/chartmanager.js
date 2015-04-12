var currentData = [];
var earthData = [];
var spaceData = [];

		var chart;
// Draws the chart
function drawChart(type){
/*
	environment_temp
    body_temp
    saliva_ph
    glucose
    water_consuption
    o
    electrocardiogram
    muscular_group
    */

    currentData = [];
    earthData = [];
    spaceData = [];
    
    // TODO: update the url per data type
	if(type!=='blood' && type!=='oximeter'){
	    loadJSON("/getdatagraphic/2/"+type,function(data){
   		 	console.log(data);
    		if(type == 'electrocardiogram' || type == 'electromyograph'){
    			var jsonObj = JSON.parse(data);
    			console.log(jsonObj);
    			var arraysize= jsonObj.length;
    			var earthDataArray = jsonObj[0].value.split(",");
				var spaceDataArray = jsonObj[1].value.split(",");
				var lastDataArray = jsonObj[arraysize-1].value.split(",");

    			for(var item in earthDataArray){
   		 			currentData.push({
						date : item,
						value : earthDataArray[item]
					});
				}
				for(var item in spaceDataArray){
					earthData.push({
						date : item,
						value : spaceDataArray[item]
					});
				}
				for(var item in lastDataArray){
					spaceData.push({
						date : item,
						value : lastDataArray[item]
					});
    			}
    			makeElectroChart();
    		} else {
    			var jsonObj = JSON.parse(data);
    			console.log(jsonObj);
    			var earth = jsonObj[0].value;
				var space = jsonObj[1].value;
    			for(var item in jsonObj){
    				console.log(jsonObj[item]);	
   		 			currentData.push({
						date : jsonObj[item].created_at,
						value : jsonObj[item].value
					});
					earthData.push({
						date : jsonObj[item].created_at,
						value : earth
					});
					spaceData.push({
						date : jsonObj[item].created_at,
						value : space
					});
    			}
    			console.log(currentData);
    			makeChart();
    		}

        });
	}else{
		if(type=='blood'){  
			loadJSON("/getdatagraphic/2/blood_pressure",function(data){
   		 		loadJSON("/getdatagraphic/2/diastolic_pressure",function(data2){
   		 			loadJSON("/getdatagraphic/2/systolic_pressure",function(data3){
   		 				var preasure = JSON.parse(data);
   		 				var diastolic = JSON.parse(data2);
   		 				var systolic = JSON.parse(data3);

   		 				console.log(data);
   		 				console.log(data2);
   		 				console.log(data3);

						var earthpreasure = preasure[0].value;
						var spacepreasure = preasure[1].value;
    					var earthpdiastolic = diastolic[0].value;
						var spacepdiastolic = diastolic[1].value;
						var earthsystolic = systolic[0].value;
						var spacesystolic = systolic[1].value;
					
    					for(var item in preasure){
   		 					currentData.push({
								date : preasure[item].created_at,
								preasure : preasure[item].value,
								diastolic : diastolic[item].value,
								systolic : systolic[item].value
							});
							earthData.push({
								date : preasure[item].created_at,
								preasure : earthpreasure,
								diastolic : earthpdiastolic,
								systolic : earthsystolic
							});
							spaceData.push({
								date : preasure[item].created_at,
								preasure : spacepreasure,
								diastolic : spacepdiastolic,
								systolic : spacesystolic
							});
    					}
    					makeBloodChart();
					});
        		});
        	});				
		}
		if(type=='oximeter'){
			loadJSON("/getdatagraphic/2/oximeter_read_value_spo2",function(data){
   		 		loadJSON("/getdatagraphic/2/oximeter_prbpm",function(data2){
   		 			var spo2 = JSON.parse(data);
   		 			var prbpm = JSON.parse(data2);
   		 			console.log(data);
   		 			console.log(data2);
					var earthspo2 = spo2[0].value;
					var spacespo2 = spo2[1].value;
    				var earthprbpm = prbpm[0].value;
					var spaceprbpm = prbpm[1].value;
					
    				for(var item in spo2){
   		 				currentData.push({
							date : spo2[item].created_at,
							spo2 : spo2[item].value,
							prbpm : prbpm[item].value
						});
						earthData.push({
							date : spo2[item].created_at,
							spo2 : earthspo2,
							prbpm : earthprbpm
						});
						spaceData.push({
							date : spo2[item].created_at,
							spo2 : spacespo2,
							prbpm : spaceprbpm
						});
    				}
    				makeOximeterChart();
				});
        	});
		}
	}
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    ;
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
// Theme can only be applied when creating chart instance - this means
// that if you need to change theme at run time, youhave to create whole
// chart object once again.

function makeChart() {

	if (chart) {
		chart.clear();
	}

	AmCharts.makeChart("chartdiv", {
		type : "stock",
		theme : "light",
		pathToImages : "../amstockchart/amcharts/images/",

		dataSets : [{
			title : "Current measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : currentData,
			categoryField : "date"
		}, {
			title : "Earth measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : earthData,
			categoryField : "date"
		}, {
			title : "First Space measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : spaceData,
			categoryField : "date"
		}],

		panels : [{

			showCategoryAxis : false,
			title : "Measure",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "value",
				comparable : true,
				compareField : "value",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		}],

		chartScrollbarSettings : {
			graph : "g1"
		},

		chartCursorSettings : {
			valueBalloonsEnabled : true
		},

		periodSelector : {
			position : "left",
			periods : [{
				period : "hh",
				count : 24,
				label : "24 hours"
			},{
				period : "DD",
				count : 7,
				label : "7 days"
			}, {
				period : "MM",
				selected : true,
				count : 1,
				label : "1 month"
			}, {
				period : "YYYY",
				count : 1,
				label : "1 year"
			}, {
				period : "MAX",
				label : "MAX"
			}]
		},

		dataSetSelector : {
			position : "left"
		}
	});
}


function makeElectroChart() {

	if (chart) {
		chart.clear();
	}

	AmCharts.makeChart("chartdiv", {
		type : "stock",
		theme : "light",
		pathToImages : "../amstockchart/amcharts/images/",

		dataSets : [{
			title : "Current measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : currentData,
			categoryField : "date"
		}, {
			title : "Earth measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : earthData,
			categoryField : "date"
		}, {
			title : "First Space measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}],
			dataProvider : spaceData,
			categoryField : "date"
		}],

		panels : [{

			showCategoryAxis : false,
			title : "Measure",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "value",
				comparable : true,
				compareField : "value",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		}],

		chartScrollbarSettings : {
			graph : "g1"
		},

		chartCursorSettings : {
			valueBalloonsEnabled : true
		},

		

		dataSetSelector : {
			position : "left"
		}
	});
}

function makeOximeterChart() {

	if (chart) {
		chart.clear();
	}

	AmCharts.makeChart("chartdiv", {
		type : "stock",
		theme : "light",
		pathToImages : "../amstockchart/amcharts/images/",

		dataSets : [{
			title : "Current measure",
			fieldMappings : [{
				fromField : "spo2",
				toField : "value"
			}, {
				fromField: "prbpm",
				toField: "volume"
			}],
			dataProvider : currentData,
			categoryField : "date"
		}, {
			title : "Earth measure",
			fieldMappings : [{
				fromField : "spo2",
				toField : "value"
			}, {
				fromField: "prbpm",
				toField: "volume"
			}],
			dataProvider : earthData,
			categoryField : "date"
		}, {
			title : "First Space measure",
			fieldMappings : [{
				fromField : "spo2",
				toField : "value"
			}, {
				fromField: "prbpm",
				toField: "volume"
			}],
			dataProvider : spaceData,
			categoryField : "date"
		}],

		panels : [{

			showCategoryAxis : false,
			title : "SPO",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "value",
				comparable : true,
				compareField : "value",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		},{

			showCategoryAxis : false,
			title : "prbpm",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "volume",
				comparable : true,
				compareField : "volume",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		}],

		chartScrollbarSettings : {
			graph : "g1"
		},

		chartCursorSettings : {
			valueBalloonsEnabled : true
		},

		periodSelector : {
			position : "left",
			periods : [{
				period : "hh",
				count : 24,
				label : "24 hours"
			},{
				period : "DD",
				count : 7,
				label : "7 days"
			}, {
				period : "MM",
				selected : true,
				count : 1,
				label : "1 month"
			}, {
				period : "YYYY",
				count : 1,
				label : "1 year"
			}, {
				period : "MAX",
				label : "MAX"
			}]
		},

		dataSetSelector : {
			position : "left"
		}
	});
}

function makeBloodChart() {

	if (chart) {
		chart.clear();
	}

	AmCharts.makeChart("chartdiv", {
		type : "stock",
		theme : "light",
		pathToImages : "../amstockchart/amcharts/images/",

		dataSets : [{
			title : "Current measure",
			fieldMappings : [{
				fromField : "preasure",
				toField : "value"
			}, {
				fromField: "diastolic",
				toField: "volume"
			}, {
				fromField: "systolic",
				toField: "other"
			}],
			dataProvider : currentData,
			categoryField : "date"
		}, {
			title : "Earth measure",
			fieldMappings : [{
				fromField : "preasure",
				toField : "value"
			}, {
				fromField: "diastolic",
				toField: "volume"
			}, {
				fromField: "systolic",
				toField: "other"
			}],
			dataProvider : earthData,
			categoryField : "date"
		}, {
			title : "First Space measure",
			fieldMappings : [{
				fromField : "preasure",
				toField : "value"
			}, {
				fromField: "diastolic",
				toField: "volume"
			}, {
				fromField: "systolic",
				toField: "other"
			}],
			dataProvider : spaceData,
			categoryField : "date"
		}],

		panels : [{

			showCategoryAxis : false,
			title : "Blood preasure",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "value",
				comparable : true,
				compareField : "value",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		},{

			showCategoryAxis : false,
			title : "Diastolic pressure",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "volume",
				comparable : true,
				compareField : "volume",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		},{

			showCategoryAxis : false,
			title : "Systolic pressure",
			percentHeight : 70,

			stockGraphs : [{
				id : "g1",
				valueField : "other",
				comparable : true,
				compareField : "other",
				bullet : "round",
				balloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBalloonText : "[[title]]:<b>[[value]]</b>",
				compareGraphBullet : "round"
			}],

			stockLegend : {
				periodValueTextComparing : "[[value.close]]",
				periodValueTextRegular : "[[value.close]]"
			}
		}],

		chartScrollbarSettings : {
			graph : "g1"
		},

		chartCursorSettings : {
			valueBalloonsEnabled : true
		},

		periodSelector : {
			position : "left",
			periods : [{
				period : "hh",
				count : 24,
				label : "24 hours"
			},{
				period : "DD",
				count : 7,
				label : "7 days"
			}, {
				period : "MM",
				selected : true,
				count : 1,
				label : "1 month"
			}, {
				period : "YYYY",
				count : 1,
				label : "1 year"
			}, {
				period : "MAX",
				label : "MAX"
			}]
		},

		dataSetSelector : {
			position : "left"
		}
	});
}

