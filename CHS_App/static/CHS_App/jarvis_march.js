console.log("jk");

// Structure for a 2D point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function checkCCW(px, py, qx, qy, rx, ry) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // If Clockwise return 1 or Counter-clockwise return 2
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
        marker: { size: 18,
                  color: 'green'  }
    }
    data = [trace1, trace2, { title: 'Jarvis March' }];
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
    data = [trace1, trace2, { title: 'Jarvis March' }];
    Plotly.newPlot('graphs-div', data);
}

// Function to find the convex hull using Jarvis March algorithm
async function jarvis_march() {
    const points = InputPoints();
    const n = points.length;
    // let unselectedpoints = InputPoints();
    // let n1 = unselectedpoints.length;

    if (n === 0) {
        alert("No points")
        return;
    }
    if (n < 3) {
        alert("Enter at least three points.");
        return;
    }; // Convex hull is not possible with less than 3 points

    let unSelectedVerticeX = [];
    let unSelectedVerticeY = [];
    let selectedVerticeX = [];
    let selectedVerticeY = [];
    for (let i = 0; i < points.length; i++) {
        unSelectedVerticeX.push(points[i].x);
        unSelectedVerticeY.push(points[i].y);
    }

    // Initialize the convex hull as an empty array
    const hullIndices = new Array(n).fill(-1);
    console.log(points);
    console.log(unSelectedVerticeX);
    console.log(unSelectedVerticeY);

    // Find the point with the leftmost x-coordinate (the starting point)
    let leftmost = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    // Start from the leftmost point and move counterclockwise to build the hull
    let current = leftmost;
    selectedVerticeX.push(points[leftmost].x);
    selectedVerticeY.push(points[leftmost].y);
    unSelectedVerticeX.splice(leftmost, 1);
    unSelectedVerticeY.splice(leftmost, 1);
    console.log("Current : ", current);
    console.log(selectedVerticeX);
    console.log(selectedVerticeY);
    console.log(unSelectedVerticeX);
    console.log(unSelectedVerticeY);
    let next;
    let hullIndex = 0;
    let j, k;
    do {
        hullIndices[hullIndex] = current;
        next = (current + 1) % n;
        for (let i = 0; i < unSelectedVerticeX.length; i++) 
        {
            // Find the most counterclockwise point relative to the current point
            // if (i != next)
            // {

                console.log("i: ", i);
                console.log("next: ", next);
            if (checkCCW(unSelectedVerticeX[current], unSelectedVerticeY[current], unSelectedVerticeX[i], unSelectedVerticeY[i], unSelectedVerticeX[next], unSelectedVerticeY[next]) === 2) {
                next = i;
                console.log("next: ", next);
                selectedVerticeX.push(unSelectedVerticeX[next]);
                selectedVerticeY.push(unSelectedVerticeY[next]);
                
                // for (let j = 0; j < unSelectedVerticeX.length; j++) {
                //     if (unSelectedVerticeX[j] == points[next].x && unSelectedVerticeY[j] == points[next].y)
                //     {
                //         k = j;
                //         break;
                //     }
                // }
                console.log("Before : ", selectedVerticeX);
                console.log(selectedVerticeY);
                unSelectedVerticeX.splice(next, 1);
                unSelectedVerticeY.splice(next, 1);
                console.log(unSelectedVerticeX);
                console.log(unSelectedVerticeY);
                console.log("Draw checking Graph");
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
                await drawcheckingGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);
                unSelectedVerticeX.splice(next, 0, unSelectedVerticeX[next]);
                unSelectedVerticeY.splice(next, 0, unSelectedVerticeY[next]);
                let lastElementIndex = -1;
                let positiveIndex = selectedVerticeX.length + lastElementIndex;
                selectedVerticeX.splice(positiveIndex, 1);
                selectedVerticeY.splice(positiveIndex, 1);
                console.log("After : ", selectedVerticeX);
                console.log(selectedVerticeY);
                console.log(unSelectedVerticeX);
                console.log(unSelectedVerticeY);
            // }
        }
        }

        current = next;
        k = 0;
        if (current != leftmost)
        {
            selectedVerticeX.push(points[current].x);
            selectedVerticeY.push(points[current].y);
            for (let j = 0; j < unSelectedVerticeX.length; j++) {
                if (unSelectedVerticeX[j] == points[current].x && unSelectedVerticeY[j] == points[current].y)
                {
                    k = j;
                    break;
                }
            }
            unSelectedVerticeX.splice(k, 1);
            unSelectedVerticeY.splice(k, 1);
            console.log("Draw Graph");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
            await drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);
            console.log("Selected : ", selectedVerticeX);
            console.log(selectedVerticeY);
            console.log(unSelectedVerticeX);
            console.log(unSelectedVerticeY);
            hullIndex++;
        }
    } while (current !== leftmost);

    selectedVerticeX.push(points[leftmost].x);
    selectedVerticeY.push(points[leftmost].y);
    console.log("Draw Final EdgeGraph");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
    await drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);
    drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);

    // Construct and return the convex hull as an array of points
    let convexHull = [];
    for (let i = 0; i < n; i++) {
        if (hullIndices[i] !== -1) {
            convexHull.push(points[hullIndices[i]]);
        }
    }

    console.log(convexHull);
}

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


// function checkCCW(p1, p2, p3) {
//     const [x1, y1, x2, y2, x3, y3] = [...p1, ...p2, ...p3];
//     const d = (y3 - y2) * (x2 - x1) - (y2 - y1) * (x3 - x2);
//     if (d > 0) {
//         return 1;
//     } else if (d < 0) {
//         return -1;
//     } else {
//         return 0;
//     }
// }

// function dist(p1, p2) {
//     const [x1, y1, x2, y2] = [...p1, ...p2];
//     return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
// }

// function jarvis_march() {
//     const points = InputPoints();
//     const n = points.length;

//     if (n === 0) {
//         alert("No points")
//         return;
//     }
//     if (n < 3) {
//         alert("Enter at least three points.");
//         return;
//     }; // Convex hull is not possible with less than 3 points

//     let unSelectedVerticeX = [];
//     let unSelectedVerticeY = [];
//     let selectedVerticeX = [];
//     let selectedVerticeY = [];
//     for (let i = 0; i < points.length; i++) {
//         unSelectedVerticeX.push(points[i].x);
//         unSelectedVerticeY.push(points[i].y);
//     }

//     const hullIndices = new Array(n).fill(-1);
//     console.log(points)

//     // Find the point with the leftmost x-coordinate (the starting point)
//     let leftmost = 0;
//     for (let i = 1; i < n; i++) {
//         if (points[i].x < points[leftmost].x) {
//             leftmost = i;
//         }
//     }

//     // Start from the leftmost point and move counterclockwise to build the hull
//     let current = leftmost;
//     // selectedVerticeX.push(points[leftmost].x);
//     // selectedVerticeY.push(points[leftmost].y);
//     // unSelectedVerticeX.splice(leftmost, 1);
//     // unSelectedVerticeY.splice(leftmost, 1);
//     console.log("Current : ", current);
//     console.log(selectedVerticeX);
//     console.log(selectedVerticeY);
//     console.log(unSelectedVerticeX);
//     console.log(unSelectedVerticeY);
    
//     let on_hull = points[leftmost];
//     console.log(on_hull)
//     let hull = [];
//     while (true) {
//         hull.push(on_hull);
//         console.log(on_hull[0][0])
//         console.log(on_hull[0][1])
//         let next_point = points[0];
//         for (const point of points) {
//             const o = checkCCW(on_hull, next_point, point);
//             if (next_point === on_hull || o === 1 || (o === 0 && dist(on_hull, point) > dist(on_hull, next_point))) {
//                 next_point = point;
//                 drawcheckingGraph(on_hull, on_hull, )
//             }
//         }
//         on_hull = next_point;
//         if (on_hull[0] === hull[0][0] && on_hull[1] === hull[0][1]) {
//             break;
//         }
//     }
//     console.log(hull);
// }

//     const points = [[2, 3], [5, 5], [1, 1], [6, 1], [4, 4], [3, 2], [7, 3]];
//     gift_wrapping(points);
