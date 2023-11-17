console.log('brute force');


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
function find(arr , val){
    for(let i = 0 ; i < arr.length ; i++)
    {
        if(arr[i] === val)
        {
            return i;
        }
    }
    return -1;
}

async function brute_force() {
    const points = InputPoints();
    const n = points.length;

    if (n === 0) {
        alert("No points")
        return;
    }
    if (n < 3) {
        alert("Enter at least three points.");
        return;
    };
    let x = [];
    let y = [];
    let selectedx = [];
    let selectedy = [];
    let unselectedx = [];
    let unselectedy = [];
    let total = 0, val;

    for (let i = 0; i < n; i++) {
        x = x + points[i].x;
        y = y + points[i].y;
    }
    let hull = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let flag2 = true;

                for (let k = 0; k < n; k++) {
                    if (i !== k && j !== k) {
                        const val = (x[j] - x[i]) * (y[k] - y[i]) - (y[j] - y[i]) * (x[k] - x[i]);
                        if (val <= 0) {
                            flag2 = false;
                            break;
                        }
                    }
                }

                if (flag2) {
                    hull[i] = j;
                    total++;
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        unselectedx.push(x[i]);
        unselectedy.push(y[i]);
    }

    let count = 0, j, savedx, savedy, i = 0;
    let done = false;
    while (true) {
        if (count == total) {
            break;
        }

        if (hull[i] != -1) {

            if (done === false) {
                selectedx.push(x[i]);
                selectedy.push(y[i]);
                val = find(unselectedx , x[i]);
                unselectedx.splice(val , 1);
                unselectedy.splice(val , 1);
                count++;
                done = true;
            }

            for (j = 0; j <= hull[i]; j++) {
                selectedx.push(x[j]);
                selectedy.push(y[j]);
                val = find(unselectedx , x[j]);
                if(val != -1)
                {
                    unselectedx.splice(val , 1);
                    unselectedy.splice(val , 1);
                }

                // call displayer
                // console.log("Draw Graph");
                // await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
                // await drawGraph(selectedx, selectedy, unselectedx, unselectedy);

                console.log(selectedx);
                console.log(selectedy);
                console.log(unselectedx);
                console.log(unselectedy);

                savedx = selectedx.pop();
                savedy = selectedy.pop();
                unselectedx.push(savedx);
                unselectedy.push(savedy);
            }

            selectedx.push(savedx);
            selectedy.push(savedy);
            unselectedx.pop();
            unselectedy.pop();

            i = hull[i];
            count++;
            continue;
        }

        i++;
    }

    console.log("Draw Graph");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
    await drawGraph(selectedx, selectedy, unselectedx, unselectedy);
}