var chartData1 = [];
	var chartData2 = [];
	var chartData3 = [];
	var chartData4 = [];
		var chart;
// Draws the chart
function drawChart(){
	generateChartData();
	// in order to set theme for a chart, all you need to include theme file
	// located in amcharts/themes folder and set theme property for the chart.

	makeChart();
}
function generateChartData() {
	var firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 500);
	firstDate.setHours(0, 0, 0, 0);

	for (var i = 0; i < 500; i++) {
		var newDate = new Date(firstDate);
		newDate.setDate(newDate.getDate() + i);

		var a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
		var b1 = Math.round(Math.random() * (1000 + i)) + 500 + i * 2;

		var a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
		var b2 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

		var a3 = Math.round(Math.random() * (100 + i)) + 200;
		var b3 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

		var a4 = Math.round(Math.random() * (100 + i)) + 200 + i;
		var b4 = Math.round(Math.random() * (100 + i)) + 600 + i;

		chartData1.push({
			date : newDate,
			value : a1,
			volume : b1
		});
		chartData2.push({
			date : newDate,
			value : a2,
			volume : b2
		});
		chartData3.push({
			date : newDate,
			value : a3,
			volume : b3
		});
		chartData4.push({
			date : newDate,
			value : a4,
			volume : b4
		});
	}
}


// Theme can only be applied when creating chart instance - this means
// that if you need to change theme at run time, youhave to create whole
// chart object once again.

function makeChart() {

	if (chart) {
		chart.clear();
	}

	// background
	if (document.body) {
	//	document.body.style.backgroundColor = "#282828";
	}


	AmCharts.makeChart("chartdiv", {
		type : "stock",
		theme : "dark",
		pathToImages : "../amstockchart/amcharts/images/",

		dataSets : [{
			title : "Current measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}, {
				fromField : "volume",
				toField : "volume"
			}],
			dataProvider : chartData1,
			categoryField : "date"
		}, {
			title : "Earth measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}, {
				fromField : "volume",
				toField : "volume"
			}],
			dataProvider : chartData2,
			categoryField : "date"
		}, {
			title : "First Space measure",
			fieldMappings : [{
				fromField : "value",
				toField : "value"
			}, {
				fromField : "volume",
				toField : "volume"
			}],
			dataProvider : chartData3,
			categoryField : "date"
		}],

		panels : [{

			showCategoryAxis : false,
			title : "Value",
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
				periodValueTextComparing : "[[percents.value.close]]%",
				periodValueTextRegular : "[[value.close]]"
			}
		}, {
			title : "Volume",
			percentHeight : 30,
			stockGraphs : [{
				valueField : "volume",
				type : "column",
				showBalloon : false,
				fillAlphas : 1
			}],

			stockLegend : {
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
				period : "DD",
				count : 10,
				label : "10 days"
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
				period : "YTD",
				label : "YTD"
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