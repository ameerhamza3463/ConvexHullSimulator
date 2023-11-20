console.log("research paper")

let x = [];
let y = [];
let reversex = [];
let reversey = [];

// Function to input points
function InputPoints() {

    const coordinates = JSON.parse(localStorage.getItem("coordinates")) || [];

    for (let i = 0; i < coordinates.length; i++) {
        if (!(!isNaN(coordinates[i].x) && !isNaN(coordinates[i].y))) {
            alert("Invalid data found");
            coordinates = [];
        }
    }

    return coordinates;
}

// draws the graph that includes points that are not necessarily the part of the hull
async function drawcheckingGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY) {
    GRAPH = document.getElementById('graphs-div');
    var trace1 = {
        x: unSelectedVerticeX,
        y: unSelectedVerticeY,
        mode: 'markers',
        type: 'scatter',
        name: "Unselected Vertices",
        marker: { size: 12 }
    }
    var trace2 = {
        x: selectedVerticeX,
        y: selectedVerticeY,
        mode: 'lines+markers',
        type: 'scatter',
        name: "Selected Vertices",
        marker: { size: 18, color: 'green'}
    }
    data = [trace1, trace2, { title: 'Brute Force' }];
    Plotly.newPlot('graphs-div', data);
}

// draws the graph that has only those points that are part of the hull
async function drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY) {
    GRAPH = document.getElementById('graphs-div');
    var trace1 = {
        x: unSelectedVerticeX,
        y: unSelectedVerticeY,
        mode: 'markers',
        type: 'scatter',
        name: "Unselected Vertices",
        marker: { size: 12 }
    }
    var trace2 = {
        x: selectedVerticeX,
        y: selectedVerticeY,
        mode: 'lines+markers',
        type: 'scatter',
        name: "Selected Vertices",
        marker: { size: 12 }
    }
    data = [trace1, trace2, { title: 'Brute Force' }];
    Plotly.newPlot('graphs-div', data);
}

// finds index
function find(px , py , x , y){
    for(let i = 0 ; i < x.length ; i++)
    {
        if(x[i] === px)
        {
            if(y[i] === py)
            {
                return i;
            }
        }
    }
    return -1;
}

// sorts points in ascending order
function sort(points , n) {

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (points[j].x > points[j + 1].x) {
                let temp1 = points[j].x;
                points[j].x = points[j + 1].x;
                points[j + 1].x = temp1;

                let temp2 = points[j].y;
                points[j].y = points[j + 1].y;
                points[j + 1].y = temp2;
            }
            else if (points[j].x === points[j + 1].x) {
                if (points[j].y > points[j + 1].y) {
                    let temp1 = points[j].x;
                    points[j].x = points[j + 1].x;
                    points[j + 1].x = temp1;

                    let temp2 = points[j].y;
                    points[j].y = points[j + 1].y;
                    points[j + 1].y = temp2;
                }
            }
        }
    }
}

function CCW(x1 , y1 , x2 , y2 , x3 , y3){
    return (((x2 - x1) * (y3 - y1)) - ((y2 - y1) * (x3 - x1)));
}

async function build_hull(x , y){
    let selectedx = [];
    let selectedy = [];
    let hull = [];
    let val;

    for(let i = 0 ; i < x.length ; i++)
    {
        while(selectedx.length >= 2) {
            val = CCW(selectedx[selectedx.length - 2] , selectedy[selectedy.length - 2] , selectedx[selectedx.length - 1] , selectedy[selectedx.length - 1] , x[i] , y[i]);
            if (val > 0){
                break;
            }
            selectedx.pop();
            selectedy.pop();
            hull.pop();
        }

        selectedx.push(x[i]);
        selectedy.push(y[i]);
        hull.push(i);

        console.log(selectedx);
        console.log(selectedy);
    }

    return hull;
}

async function monotone_chain(){
    let points = InputPoints();
    const n = points.length;

    if (n === 0) {
        alert("No points")
        return;
    }
    if (n < 3) {
        alert("Enter at least three points.");
        return;
    };

    sort(points , n);

    console.log("sorted points array");
    console.log(points);

    for(let i = 0 ; i < n ; i++)
    {
        x.push(points[i].x);
        y.push(points[i].y);

        reversex.push(points[n-1-i].x);
        reversey.push(points[n-1-i].y);
    }

    console.log("lower hull");
    let lowerhull = build_hull(x , y);

    console.log("upper hull");
    let upperhull = build_hull(reversex , reversey);

    // combine the hulls and display one last time
    (await lowerhull).concat((await upperhull).splice(1 , n - 1));
}
