console.log("quick hull");
let selectedx = [];
let selectedy = [];
let unselectedx = [];
let unselectedy = [];

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

// finds the index of a point in the array
function find(p1x, p1y, x, y) {
    for (let i = 0; i < x.length; i++) {
        if (x[i] === p1x) {
            if (y[i] === p1y) {
                return i;
            }
        }
    }

    return -1;
}

// sorts points in ascending order
function sort(x, y, n) {

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (x[j] > x[j + 1]) {
                let temp1 = x[j];
                x[j] = x[j + 1];
                x[j + 1] = temp1;

                let temp2 = y[j];
                y[j] = y[j + 1];
                y[j + 1] = temp2;
            }
            else if (x[j] === x[j + 1]) {
                if (y[j] > y[j + 1]) {
                    let temp1 = x[j];
                    x[j] = x[j + 1];
                    x[j + 1] = temp1;

                    let temp2 = y[j];
                    y[j] = y[j + 1];
                    y[j + 1] = temp2;
                }
            }
        }
    }
}

// calculates slope between two points
function slope(p1x, p1y, p2x, p2y) {
    return (p2y - p1y) / (p2x - p1x);
}

// calculates the y intercept
function intercept(p1x, p1y, p2x, p2y, m) {
    return p1y - (m * p1x);
}

// finds the list of all points above the line
function calcabove(p1x, p1y, p2x, p2y, x, y) {

    let m = slope(p1x, p1y, p2x, p2y)
    let b = intercept(p1x, p1y, p2x, p2y, m);

    let pointsabove = [];

    for (let i = 0; i < x.length; i++) {
        let val = m * x[i] + b;
        // console.log(`Point (${x[i]}, ${y[i]}) is compared to Line Y = ${val} and y[i] = ${y[i]}`);
        if (y[i] > val) {
            pointsabove.push(i);
        }
    }

    return pointsabove;
}

// finds the list of all points below the line
function calcbelow(p1x, p1y, p2x, p2y, x, y) {

    let m = slope(p1x, p1y, p2x, p2y)
    let b = intercept(p1x, p1y, p2x, p2y, m);

    let pointsbelow = [];

    for (let i = 0; i < x.length; i++) {
        let val = m * x[i] + b;
        // console.log(`Point (${x[i]}, ${y[i]}) is compared to Line Y = ${val} and y[i] = ${y[i]}`);        
        if (y[i] < val) {
            pointsbelow.push(i);
        }
    }

    return pointsbelow;
}

function farthest_distance(p1x, p1y, p2x, p2y, xpoints, ypoints) {
    let far_distance = 0;
    let farthest_index = -1;
    let distance = 0;
    let A, B, C;

    // creating the equation
    A = -1 * slope(p1x, p1y, p2x, p2y);
    B = 1;
    C = -1 * intercept(p1x, p1y, p2x, p2y, -1 * A);

    for (let i = 0; i < xpoints.length; i++) {
        distance = Math.abs(A * xpoints[i] + B * ypoints[i] + C) / Math.sqrt(A ** 2 + B ** 2);

        if (distance > far_distance) {
            far_distance = distance;
            farthest_index = i;
        }
    }

    return farthest_index;
}

function quickhull2(p1x, p1y, p2x, p2y, xpoints, ypoints, state) {

    if (xpoints.length === 0) {
        return;
    }

    if (state === "above" || state === "mid") {
        let aboveindex = calcabove(p1x, p1y, p2x, p2y, xpoints, ypoints);
        if (aboveindex.length === 0) {
            return;
        }
        let abovex = [];
        let abovey = [];
        for (let i = 0; i < aboveindex.length; i++) {
            abovex.push(xpoints[aboveindex[i]]);
            abovey.push(ypoints[aboveindex[i]]);
        }
        if (abovex.length === 0) {
            return;
        }
        let farthest_index = farthest_distance(p1x, p1y, p2x, p2y, abovex, abovey);
        let farthestx = abovex[farthest_index];
        let farthesty = abovey[farthest_index];
        let val = find(farthestx, farthesty, unselectedx, unselectedy);
        if (val === -1) {
            return;
        }
        unselectedx.splice(val, 1);
        unselectedy.splice(val, 1);
        selectedx.push(farthestx);
        selectedy.push(farthesty);
        // call the displayer
        console.log(selectedx);
        console.log(selectedy);
        // here the displayer call will end
        quickhull2(p1x, p1y, farthestx, farthesty, unselectedx, unselectedy, "above");
        quickhull2(farthestx, farthesty, p2x, p2y, unselectedx, unselectedy, "above");
    }

    if (state === "below" || state === "mid") {
        let belowindex = calcbelow(p1x, p1y, p2x, p2y, xpoints, ypoints);
        if (belowindex.length === 0) {
            return;
        }
        let belowx = [];
        let belowy = [];
        for (let i = 0; i < belowindex.length; i++) {
            belowx.push(xpoints[belowindex[i]]);
            belowy.push(ypoints[belowindex[i]]);
        }
        if (belowx.length === 0) {
            return;
        }
        let farthest_index = farthest_distance(p1x, p1y, p2x, p2y, belowx, belowy);
        let farthestx = belowx[farthest_index];
        let farthesty = belowy[farthest_index];
        let val = find(farthestx, farthesty, unselectedx, unselectedy);
        if (val === -1) {
            return;
        }
        unselectedx.splice(val, 1);
        unselectedy.splice(val, 1);
        selectedx.push(farthestx);
        selectedy.push(farthesty);
        // call the displayer
        console.log(selectedx);
        console.log(selectedy);
        // here the displayer call will end
        quickhull2(p1x, p1y, farthestx, farthesty, unselectedx, unselectedy, "below");
        quickhull2(farthestx, farthesty, p2x, p2y, unselectedx, unselectedy, "below");
    }

    return;
}

function quick_hull() {

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

    for (let i = 0; i < n; i++) {
        x.push(points[i].x);
        y.push(points[i].y);

        unselectedx.push(points[i].x);
        unselectedy.push(points[i].y);
    }

    sort(x, y, n);

    console.log("x and y Array:");
    console.log(x);
    console.log(y);

    let p1x = x[0];
    let p1y = y[0];
    let p2x = x[n - 1];
    let p2y = y[n - 1];


    selectedx.splice(0, 0, x[0], x[n - 1]);
    selectedy.splice(0, 0, y[0], y[n - 1]);
    // draw graph once
    selectedx.splice(0, 2);
    selectedy.splice(0, 2);


    quickhull2(p1x, p1y, p2x, p2y, x, y, "mid");
    unselectedx.splice(0, 1);
    unselectedy.splice(0, 1);
    unselectedx.splice(n - 1, 1);
    unselectedy.splice(n - 1, 1);

    selectedx.splice(0, 0, x[0], x[n - 1]);
    selectedy.splice(0, 0, y[0], y[n - 1]);
    console.log(selectedx);
    console.log(selectedy);
}