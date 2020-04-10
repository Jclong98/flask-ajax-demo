// function to be called when the "Get Data" button is pressed
// takes an id to a canvas object and sets it to a chartjs chart
function setTemps(id) {
            
    // this is the actual query to the server using jquery
    $.getJSON(

        // arg1: location of url we want to contact
        $SCRIPT_ROOT + '/_get_data',

        // arg2: data to be passed from here to the server
        // left empty because only one button is pressed
        {},

        // arg3: function to be called on success
        // data is a json Object
        function(data) {

            // building the chart with chart.js
            // get the context of a selected chart canvas
            var ctx = document.getElementById(id).getContext('2d');

            // use that context to build a chart.js chart
            var myChart = new Chart(ctx, {
                // type of chart
                type: 'line',

                // data to fill chart
                data: {
                    // making a list of labels
                    labels: Object.values(data['DOY']),
                    datasets: [
                        {
                            label: 'Air Min',
                            data: Object.values(data['Air Min']),
                            borderColor: 'royalblue',
                            backgroundColor: 'transparent',
                            // fill:'start', //filling from the very bottom
                        },
                        {
                            label: 'Air Max',
                            data: Object.values(data['Air Max']),
                            borderColor: 'tomato',
                            backgroundColor: 'transparent',
                            // fill:'start', //filling from the very bottom
                        },
                    ]
                },

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
                                max:35,
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
        }
    );
}
