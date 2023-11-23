// structures for the program
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

// getting and generating input co-ordinates functions
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

function getRandomCoordinate() {
    return Math.random() * 100; // Adjust the range as needed
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

// first line intersection algo's helper and main functions
function findIntersection(line1, line2) {
    // Extract coordinates
    let x1 = line1.point1.x, y1 = line1.point1.y;
    let x2 = line1.point2.x, y2 = line1.point2.y;
    let x3 = line2.point1.x, y3 = line2.point1.y;
    let x4 = line2.point2.x, y4 = line2.point2.y;

    // Calculate the intersection point
    let x =
        ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

    let y =
        ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

    return new Point(x, y);
}

function checkCCW(a, b, c) {
    const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if (val < 0) return -1;
    else if (val > 0) return 1;
    else return 0;
}

function ccw() {
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
        drawGraph(line1, line2, intersect, intersect ? findIntersection(line1, line2) : null);
    }
}

// second line intersection algo's helper and main functions
function slope_line_method() {

}

// third line intersection algo's helper and main functions
function calcDet(a, b, c, d) {
    return ((a * d) - (b * c));
}

function intercept(p1x, p1y, p2x, p2y, m) {
    return p1y - (m * p1x);
}

function slope(p1x, p1y, p2x, p2y) {
    return (p2y - p1y) / (p2x - p1x);
}

function cramers_rule() {
    // getting the line inputs
    console.log('line_intersection_03');

    if (check_input_coordinates()) {
        alert("Please enter valid numeric values for all points.");
        return;
    }
    let [line1, line2] = get_input_coordinates();
    console.log(line1);
    console.log(line2);

    // declaring line and point variables
    let p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y;
    let l1a, l1b, l1c, l2a, l2b, l2c;

    // extracting points from the entered values
    p1x = line1.point1.x;
    p1y = line1.point1.y;
    p2x = line1.point2.x;
    p2y = line1.point2.y;

    p3x = line2.point1.x;
    p3y = line2.point1.y;
    p4x = line2.point2.x;
    p4y = line2.point2.y;

    // printing the line points
    console.log("Line details:\n");
    console.log("Line 1 point details:\n", `${p1x},${p1y}\n${p2x},${p2y}\n\n`);
    console.log("Line 2 point details:\n", `${p3x},${p3y}\n${p4x},${p4y}\n\n`);

    // declaring slope and intercept variables
    let m1, m2, c1, c2;

    // calculating the slope and intercept of the two lines
    m1 = slope(p1x, p1y, p2x, p2y);
    m2 = slope(p3x, p3y, p4x, p4y);

    c1 = intercept(p1x, p1y, p2x, p2y, m1);
    c2 = intercept(p3x, p3y, p4x, p4y, m2);

    console.log("The slope of line 1 is: ", `${m1}\n`);
    console.log("The slope of line 2 is: ", `${m2}\n`);

    console.log("The intercept of line 1 is: ", `${c1}\n`);
    console.log("The intercept of line 2 is: ", `${c2}\n\n`);

    if (!isFinite(m1) && !isFinite(m2)) {
        console.log("Lines are parallel");
        ccw();
        return;
    }
    else if (!isFinite(m1) || !isFinite(m2)) {
        console.log("Either line is vertical");
        return;
    }

    // giving values to the line variables
    l1a = (-1 * m1);
    l1b = 1;
    l1c = c1;

    l2a = (-1 * m2);
    l2b = 1;
    l2c = c2;

    console.log("Line details:\n");
    console.log("Line equations:\n", `${l1a}x + ${l1b}y = ${l1c}\n\n`);
    console.log("Line equations:\n", `${l2a}x + ${l2b}y = ${l2c}\n\n`);

    /*
    Crammer's Method Summary:-
    determinant != 0 -> unqiue solution
    determinant = 0 -> skew, parallel or coincident
    != slope -> skew
    = slope and != intercept -> parallel
    = slope and = intercept -> coincident
    */

    // calculating the determinant
    let det;
    det = calcDet(l1a, l1b, l2a, l2b);
    console.log("The determinant is: ", `${det}\n\n`);

    // deciding the relationship between the lines
    if (det === 0) {
        if (m1 === m2) {
            if (c1 === c2) {
                console.log("lines are collinear");
                drawCollinear();
            }
            else {
                console.log("lines are parallel");
                drawGraph(line1, line2, false, null);
            }
        }
        else {
            // btw these don't exist in two dimesions so this is just a check but the program will never reach here
            console.log("lines are skew");
            drawGraph(line1, line2, false, null);
        }
    }
    else if (det !== 0) {
        let Dx, Dy;

        Dx = calcDet(l1c, l1b, l2c, l2b);
        Dy = calcDet(l1a, l1c, l2a, l2c);

        console.log("The determinant wrt x is: ", `${Dx}\n\n`);
        console.log("The determinant wrt y is: ", `${Dy}\n\n`);

        let xval, yval;

        xval = Dx / det;
        yval = Dy / det;

        console.log("Lines intersect at:\n", `${xval} , ${yval}`);

        let result = new Point(xval, yval);

        // drawGraph(line1, line2, true, result);
        drwaInfinite(line1, line2, true, result);
    }
}

// drawing functions for GUI
function drawGraph(line1, line2, intersect, intersection_point) {
    let output_color = intersect ? 'green' : "blue";
    let output_name = intersect ? 'Intersecting' : "Not Intersecting"
    var trace3 = {};
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
    if (intersection_point !== null) {
        trace3 = {
            x: [intersection_point.x],
            y: [intersection_point.y],
            mode: 'lines+markers',
            type: 'lines',
            name: "Intersection",
            marker: { size: 13, color: "orange" }
        }
    }
    var layout = {
        title: {
            text: output_name,
        }
    }
    data = [trace1, trace2, trace3, { title: 'Line Intersection' }];
    Plotly.newPlot('graphs-div', data, layout);
}

function drwaInfinite(line1, line2, intersect, intersection_point) {
    let output_color1 = intersect ? 'green' : "blue";
    let output_color2 = intersect ? 'green' : "yellow";
    let output_name = intersect ? 'Intersecting' : "Not Intersecting";

    // Define points outside the visible range
    const extensionFactor = 1000; // Adjust this factor as needed
    const extendedRange = {
        min: -extensionFactor,
        max: extensionFactor,
    };

    // Calculate extended points for Line 1
    const extendedLine1 = {
        point1: {
            x: extendedRange.min,
            y: line1.point1.y + (extendedRange.min - line1.point1.x) * (line1.point2.y - line1.point1.y) / (line1.point2.x - line1.point1.x),
        },
        point2: {
            x: extendedRange.max,
            y: line1.point1.y + (extendedRange.max - line1.point1.x) * (line1.point2.y - line1.point1.y) / (line1.point2.x - line1.point1.x),
        },
    };

    // Calculate extended points for Line 2
    const extendedLine2 = {
        point1: {
            x: extendedRange.min,
            y: line2.point1.y + (extendedRange.min - line2.point1.x) * (line2.point2.y - line2.point1.y) / (line2.point2.x - line2.point1.x),
        },
        point2: {
            x: extendedRange.max,
            y: line2.point1.y + (extendedRange.max - line2.point1.x) * (line2.point2.y - line2.point1.y) / (line2.point2.x - line2.point1.x),
        },
    };

    // Trace for Line 1
    var trace1 = {
        x: [extendedLine1.point1.x, extendedLine1.point2.x],
        y: [extendedLine1.point1.y, extendedLine1.point2.y],
        mode: 'lines',
        type: 'lines',
        name: "Line 01",
        marker: { size: 12, color: output_color1 }
    };

    // Trace for Line 2
    var trace2 = {
        x: [extendedLine2.point1.x, extendedLine2.point2.x],
        y: [extendedLine2.point1.y, extendedLine2.point2.y],
        mode: 'lines',
        type: 'lines',
        name: "Lines 02",
        marker: { size: 12, color: output_color2 }
    };

    // Trace for Intersection Point
    var trace3 = {};
    if (intersection_point !== null) {
        trace3 = {
            x: [intersection_point.x],
            y: [intersection_point.y],
            mode: 'markers',
            type: 'scatter',
            name: "Intersection",
            marker: { size: 13, color: "orange" }
        };
    }

    var layout = {
        title: {
            text: output_name,
        }
    };

    data = [trace1, trace2, trace3, { title: 'Line Intersection' }];
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