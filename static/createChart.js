// building the chart with chart.js
// get the context of a selected chart canvas
var ctx = document.getElementById("chart").getContext('2d');

// use that context to build a chart.js chart
var myChart = new Chart(ctx, {
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
                ticks: {
                    min: -5,
                }
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

// function to be called when the "Get Data" button is pressed
// takes an id to a canvas object and sets it to a chartjs chart
function setTemps() {
    
    // grabbing year from text input
    var year = document.getElementById("year").value;

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
            
            // setting labels and datasets in the chart
            myChart.data.labels = Object.values(data['DOY']);

            // min temps
            myChart.data.datasets[0] = {
                label: 'Air Min',
                data: Object.values(data['Air Min']),
                borderColor: 'royalblue',
                backgroundColor: 'transparent',
                // fill:'start', //filling from the very bottom
            };

            // max temps
            myChart.data.datasets[1] = {
                label: 'Air Max',
                data: Object.values(data['Air Max']),
                borderColor: 'tomato',
                backgroundColor: 'transparent',
                // fill:'start', //filling from the very bottom
            };

            // calling update to actually apply the changes
            myChart.update();
        }
    );
}

// populate the graph with default data
setTemps();

// allow the user to press enter on the text input
var input = document.getElementById("year")
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        document.getElementById("get-data-btn").click();
    }
});
