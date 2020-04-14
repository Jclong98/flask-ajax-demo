
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
 * uses jquery.getJSON to send the year to the server and use 
 * the returned data to plotly.js figure
*/
function setTemps() {
    
    // this is the actual query to the server using jquery
    $.getJSON(

        // arg1: location of url we want to contact
        $SCRIPT_ROOT + '/_get_data',

        // arg2: data to be passed from here to the server
        {
            year: document.getElementById("year").value
        },

        // arg3: function to be called on success
        // data is a json Object
        function(data) {
            
            // PLOTLY FIGURE
            updatePlotly(data);
        }
    );
}

// populate the graph with default data
setTemps();

// get new data when the dropdown is changed
let input = document.getElementById("year")
input.addEventListener("change", setTemps)