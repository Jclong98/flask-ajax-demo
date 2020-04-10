// building the chart with chart.js
// get the context of a selected chart canvas
let ctx = document.getElementById("chartjs-figure").getContext('2d');

// use that context to build a chart.js chart
let myChart = new Chart(ctx, {
    // type of chart
    type: 'line',

    // data to fill chart
    data: {},

    // chart styling and behavior options
    options: {
        title: {
            display: true,
            text: 'AZMET Min and Max Temperature'
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature (C)'
                },
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Day of Year'
                }
            }],
        }
    }
});

/** use setTemps returned data to update the chartjs figure */
function updateChartjs(data) {
    myChart.data.labels = Object.values(data['DOY']);
    // min temps
    myChart.data.datasets[0] = {
        label: 'Air Min',
        data: Object.values(data['Air Min']),
        borderColor: 'royalblue',
        backgroundColor: 'transparent',
    };
    // max temps
    myChart.data.datasets[1] = {
        label: 'Air Max',
        data: Object.values(data['Air Max']),
        borderColor: 'tomato',
        backgroundColor: 'transparent',
    };
    // calling update to actually apply the changes
    myChart.update();
}

// building a plotly.js figure to be populated
let layout = {
    title: "AZMET Min and Max Temperature",
    xaxis: {
        title: "Day of Year"
    },
    yaxis: {
        title: "Temperature (C)"
    }
}

var config = {responsive: true}

Plotly.newPlot('plotly-figure', [], layout, config);

/** use setTemps returned data to update the plotly figure */
function updatePlotly(data) {
    let traceMax = {
        name: "Air max",
        x: Object.values(data['DOY']),
        y: Object.values(data['Air Max']),
        type: 'scatter',
        marker: {
            color:'tomato'
        }
    };

    let traceMin = {
        name: "Air Min",
        x: Object.values(data['DOY']),
        y: Object.values(data['Air Min']),
        type: 'scatter',
        marker: {
            color:'royalblue'
        }
    };
    
    // use Plotly.react to update the figure because it is faster thant Plotly.newPlot
    Plotly.react('plotly-figure', [traceMin, traceMax], layout);
}

/**
 * function to be called when the "Get Data" button is pressed 
 * takes an id to a canvas object and sets it to a chartjs chart 
*/
function setTemps() {
    
    // grabbing year from text input
    let year = document.getElementById("year").value;

    // this is the actual query to the server using jquery
    $.getJSON(

        // arg1: location of url we want to contact
        $SCRIPT_ROOT + '/_get_data',

        // arg2: data to be passed from here to the server
        {
            // if a year exists, use it. else, use 20
            year: year ? year : "20"
        },

        // arg3: function to be called on success
        // data is a json Object
        function(data) {
            
            // CHARTJS FIGURE
            // setting labels and datasets in the chart
            updateChartjs(data);

            // PLOTLY FIGURE
            updatePlotly(data);
        }
    );
}

// populate the graph with default data
setTemps();

// allow the user to press enter on the text input
let input = document.getElementById("year")
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        document.getElementById("get-data-btn").click();
    }
});


