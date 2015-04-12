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
    $.getJSON( "/getdatagraphic", function( data ) {
    	console.log(data);
		var earth = 10;
		var space = 0.5;
    	if(type !== 'electrocardiogram' && type !== 'muscular_group'){
    		var jsonObj = JSON.parse(data);
    		console.log(jsonObj);
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
    	
    	}
    	makeChart();
    });	
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