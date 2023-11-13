console.log("jk");

// Structure for a 2D point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Function to check if three points are in a counter-clockwise order
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // If Clockwise return 1 or Counter-clockwise return 2
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

    // drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);



    // Initialize the convex hull as an empty array
    const hullIndices = new Array(n).fill(-1);
    console.log(points)

    // Find the point with the leftmost x-coordinate (the starting point)
    let leftmost = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    // Start from the leftmost point and move counterclockwise to build the hull
    let current = leftmost;
    console.log("Current : ", current);
    selectedVerticeX.push(points[leftmost].x);
    selectedVerticeY.push(points[leftmost].y);
    unSelectedVerticeX.splice(leftmost, 1);
    unSelectedVerticeY.splice(leftmost, 1);
    let next;
    let hullIndex = 0;
    let j, k;
    do {
        hullIndices[hullIndex] = current;
        next = (current + 1) % n;
        for (let i = 0; i < n; i++) {
            // Find the most counterclockwise point relative to the current point
            if (orientation(points[current], points[i], points[next]) === 2) {
                next = i;
            }
        }
        current = next;
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
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Change the delay time as needed
            await drawGraph(selectedVerticeX, selectedVerticeY, unSelectedVerticeX, unSelectedVerticeY);

            hullIndex++;
        }
    } while (current !== leftmost);
    selectedVerticeX.push(points[leftmost].x);
    selectedVerticeY.push(points[leftmost].y);
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

// Define a structure for a 2D point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let p0; // Define p0 as a global variable

// Function to check if three points are in a counterclockwise order
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
}

// Function to compute the square of the distance between two points
function distSq(p, q) {
    return (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
}

// Function to compare two points for sorting
function compare(vp1, vp2) {
    let p1 = vp1;
    let p2 = vp2;

    const o = orientation(p0, p1, p2);
    if (o === 0) {
        return distSq(p0, p2) >= distSq(p0, p1) ? -1 : 1;
    }
    return o === 2 ? -1 : 1;
}

// Function to find the convex hull using the Graham Scan algorithm
function Graham_Scan(points) {
    const n = points.length;

    // Find the point with the lowest y-coordinate (and leftmost if tied)
    let ymin = points[0].y;
    let min = 0;
    for (let i = 1; i < n; i++) {
        const y = points[i].y;
        if (y < ymin || (y === ymin && points[i].x < points[min].x)) {
            ymin = points[i].y;
            min = i;
        }
    }

    // Place the point with the lowest y-coordinate at the beginning
    [points[0], points[min]] = [points[min], points[0]];
    p0 = points[0];

    // Sort the rest of the points based on polar angle with p0
    points.sort(compare);

    // Initialize the convex hull
    const hull = [points[0], points[1], points[2]];
    let m = 3;

    // Process the rest of the points to construct the convex hull
    for (let i = 3; i < n; i++) {
        // Remove points that create a clockwise turn
        while (m > 1 && orientation(hull[m - 2], hull[m - 1], points[i]) !== 2) {
            m--;
            // hull.pop();
        }
        // hull.push(points[i]);
        hull[m++] = points[i];
        // m++;
    }

    // Print the points on the convex hull
    console.log("\nConvex Hull Points:");
    for (let i = 0; i < m; i++) {
        console.log(`(${hull[i].x}, ${hull[i].y})`);
    }
}

// Example usage
const points = []; // Array to store input points

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to input points
