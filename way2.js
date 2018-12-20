var jsdom = require('jsdom');
var fs = require('fs');
var jQuery = fs.readFileSync('./jquery-3.1.1.min.js').toString();
var Highstock = fs.readFileSync('./highstock.js').toString();
var Exporting = fs.readFileSync('./exporting.js').toString();
debugger
let rawdata = fs.readFileSync('tmp.json');  
let seriesData = JSON.parse(rawdata);
jsdom.env({
    html: '<div id="container"></div>',
    src: [ jQuery, Highstock, Exporting ],
    done: function(errors, window) {
        debugger
        if (errors) return console.log(errors);
        var Highcharts = window.Highcharts;
        var chart = new Highcharts.stockChart({
            chart: {
                renderTo: 'container',
                animation: false,
                forExport: true       
            },
            exporting: { enabled: true },
            rangeSelector: {
                selected: 4
            },
            title: {
                text: 'AAPL Stock Price'
            },
            series: [{
                name: 'AAPL',
                data: seriesData,
                tooltip: {
                    valueDecimals: 2
                }
            }]            
        });
        var svg = chart.getSVG();
        fs.writeFile("./test.svg", svg, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
});