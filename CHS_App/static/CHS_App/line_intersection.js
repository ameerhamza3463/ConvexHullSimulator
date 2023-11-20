class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }
}
function check_input_coordinates() {
    let l1p1x = document.querySelector("#l1p1x").value;
    let l1p1y = document.querySelector("#l1p1y").value;
    let l1p2x = document.querySelector("#l1p2x").value;
    let l1p2y = document.querySelector("#l1p2y").value;
    let l2p1x = document.querySelector("#l2p1x").value;
    let l2p1y = document.querySelector("#l2p1y").value;
    let l2p2x = document.querySelector("#l2p2x").value;
    let l2p2y = document.querySelector("#l2p2y").value;

    // Check for missing values or non-numeric input
    if (l1p1x === '' || l1p1y === '' || l1p2x === '' || l1p2y === '' ||
        l2p1x === '' || l2p1y === '' || l2p2x === '' || l2p2y === '') {
        return true;
    }
    if (isNaN(l1p1x) || isNaN(l1p1y) || isNaN(l1p2x) || isNaN(l1p2y) ||
        isNaN(l2p1x) || isNaN(l2p1y) || isNaN(l2p2x) || isNaN(l2p2y)) {
        return true;
    }
    return false;
}
function get_input_coordinates() {
    let l1p1 = new Point(parseInt(document.querySelector("#l1p1x").value), parseInt(document.querySelector("#l1p1y").value));
    let l1p2 = new Point(parseInt(document.querySelector("#l1p2x").value), parseInt(document.querySelector("#l1p2y").value));
    let l2p1 = new Point(parseInt(document.querySelector("#l2p1x").value), parseInt(document.querySelector("#l2p1y").value));
    let l2p2 = new Point(parseInt(document.querySelector("#l2p2x").value), parseInt(document.querySelector("#l2p2y").value));

    return [new Line(l1p1, l1p2), new Line(l2p1, l2p2)];
}
function random_lines() {
    // Generate random coordinates for Line 1
    let l1p1x = getRandomCoordinate();
    let l1p1y = getRandomCoordinate();
    let l1p2x = getRandomCoordinate();
    let l1p2y = getRandomCoordinate();

    // Generate random coordinates for Line 2
    let l2p1x = getRandomCoordinate();
    let l2p1y = getRandomCoordinate();
    let l2p2x = getRandomCoordinate();
    let l2p2y = getRandomCoordinate();

    // Put these points in their places
    document.querySelector("#l1p1x").value = parseInt(l1p1x);
    document.querySelector("#l1p1y").value = parseInt(l1p1y);
    document.querySelector("#l1p2x").value = parseInt(l1p2x);
    document.querySelector("#l1p2y").value = parseInt(l1p2y);
    document.querySelector("#l2p1x").value = parseInt(l2p1x);
    document.querySelector("#l2p1y").value = parseInt(l2p1y);
    document.querySelector("#l2p2x").value = parseInt(l2p2x);
    document.querySelector("#l2p2y").value = parseInt(l2p2y);

}

function getRandomCoordinate() {
    return Math.random() * 100; // Adjust the range as needed
}

function line_intersection_01() {
    if (check_input_coordinates()) {
        alert("Please enter valid numeric values for all points.");
        return;
    }
    let [line1, line2] = get_input_coordinates();
    console.log(line1);
    console.log(line2);

    let test1 = checkCCW(line1.point1, line1.point2, line2.point1) *
        checkCCW(line1.point1, line1.point2, line2.point2);
    let test2 = checkCCW(line2.point1, line2.point2, line1.point1) *
        checkCCW(line2.point1, line2.point2, line1.point2);
    let intersect = test1 <= 0 && test2 <= 0;
    console.log(`test1:${test1}  test2:${test2}`);
    // Add a special case for collinear lines
    if (test1 === 0 && test2 === 0) {
        alert("Collinear lines - Special case, handle as needed.");
        drawCollinear();
    } else {
        let intersect = test1 <= 0 && test2 <= 0;
        if (intersect) {
            console.log("True");
        } else {
            console.log("False");
        }
        drawGraph(line1, line2, intersect);
    }
}

function checkCCW(a, b, c) {
    const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if (val < 0) return -1;
    else if (val > 0) return 1;
    else return 0;
}

function drawGraph(line1, line2, intersect) {
    let output_color = intersect ? 'green' : "blue";
    let output_name = intersect ? 'Intersecting' : "Not Intersecting"
    GRAPH = document.getElementById('graphs-div');
    var trace1 = {
        x: [line1.point1.x, line1.point2.x],
        y: [line1.point1.y, line1.point2.y],
        mode: 'lines+markers',
        type: 'lines',
        name: "Line 01",
        marker: { size: 12, color: output_color }
    }
    var trace2 = {
        x: [line2.point1.x, line2.point2.x],
        y: [line2.point1.y, line2.point2.y],
        mode: 'lines+markers',
        type: 'lines',
        name: "Lines 02",
        marker: { size: 12, color: output_color }
    }
    var layout = {
        title: {
            text: output_name,
        }
    }
    data = [trace1, trace2, { title: 'Line Intersection' }];
    Plotly.newPlot('graphs-div', data, layout);

}

function drawCollinear() {
    let output_color = "orange";
    GRAPH = document.getElementById('graphs-div');
    var c = {
        x: [-8, -10, -12, -12, -10, -8],
        y: [6, 6, 5, 2, 1, 1],
        mode: 'lines+markers',
        type: 'lines',
        name: "C",
        marker: { size: 10, color: output_color }
    }
    var o = {
        x: [-4, 0, 1, 1, 0, -4, -5, -5, -4],
        y: [6, 6, 5, 2, 1, 1, 2, 5, 6],
        mode: 'lines+markers',
        type: 'lines',
        name: "O",
        marker: { size: 12, color: output_color }
    }
    var l1 = {
        x: [7, 4, 4],
        y: [1, 1, 10],
        mode: 'lines+markers',
        type: 'lines',
        name: "L",
        marker: { size: 12, color: output_color }
    }
    var l2 = {
        x: [13, 10, 10],
        y: [1, 1, 10],
        mode: 'lines+markers',
        type: 'lines',
        name: "L",
        marker: { size: 12, color: output_color }
    }
    var i = {
        x: [15, 15],
        y: [1, 6],
        mode: 'lines+markers',
        type: 'lines',
        name: "I",
        marker: { size: 12, color: output_color }
    }
    var i_dot = {
        x: [15],
        y: [8],
        mode: 'lines+markers',
        type: 'lines',
        name: "I dot",
        marker: { size: 20, color: output_color }
    }
    var n = {
        x: [18, 18, 17, 18, 19, 23, 24, 24],
        y: [1, 5, 6, 5, 6, 6, 5, 1],
        mode: 'lines+markers',
        type: 'lines',
        name: "N",
        marker: { size: 12, color: output_color }
    }
    var e = {
        x: [32, 28, 27, 28, 32, 33, 27],
        y: [1, 1, 3, 6, 6, 3, 3],
        mode: 'lines+markers',
        type: 'lines',
        name: "E",
        marker: { size: 12, color: output_color }
    }
    var a = {
        x: [37, 40, 41, 41, 37, 36, 36, 41],
        y: [6, 6, 5, 1, 1, 2, 4, 4],
        mode: 'lines+markers',
        type: 'lines',
        name: "A",
        marker: { size: 12, color: output_color }
    }
    var r = {
        x: [44, 44, 44, 45, 46],
        y: [1, 6, 5, 6, 6],
        mode: 'lines+markers',
        type: 'lines',
        name: "R",
        marker: { size: 12, color: output_color }
    }
    data = [c, o, l1, l2, i, i_dot, n, e, a, r, { title: 'Line Intersection' }];
    Plotly.newPlot('graphs-div', data);
}