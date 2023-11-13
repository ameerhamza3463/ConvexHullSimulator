// const readline = require('readline');

// // Define a structure for a 2D point
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }

// let p0; // Define p0 as a global variable

// // Function to check if three points are in a counterclockwise order
// function orientation(p, q, r) {
//     const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
//     if (val === 0) return 0; // Collinear
//     return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
// }

// // Function to compute the square of the distance between two points
// function distSq(p, q) {
//     return (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
// }

// // Function to compare two points for sorting
// function compare(p1, p2) {
//     const o = orientation(p0, p1, p2);
//     if (o === 0) {
//         return distSq(p0, p2) >= distSq(p0, p1) ? -1 : 1;
//     }
//     return o === 2 ? -1 : 1;
// }

// // Function to find the convex hull using the Graham Scan algorithm
// function Graham_Scan(points) {
//     const n = points.length;

//     // Find the point with the lowest y-coordinate (and leftmost if tied)
//     let ymin = points[0].y;
//     let min = 0;
//     for (let i = 1; i < n; i++) {
//         const y = points[i].y;
//         if (y < ymin || (y === ymin && points[i].x < points[min].x)) {
//             ymin = y;
//             min = i;
//         }
//     }

//     // Place the point with the lowest y-coordinate at the beginning
//     [points[0], points[min]] = [points[min], points[0]];
//     p0 = points[0];

//     // Sort the rest of the points based on polar angle with p0
//     points.slice(1).sort(compare);

//     // Initialize the convex hull
//     const hull = [points[0], points[1], points[2]];
//     let m = 3;

//     // Process the rest of the points to construct the convex hull
//     for (let i = 3; i < n; i++) {
//         // Remove points that create a clockwise turn
//         while (m > 1 && orientation(hull[m - 2], hull[m - 1], points[i]) !== 2) {
//             m--;
//             hull.pop();
//         }
//         hull.push(points[i]);
//         m++;
//     }

//     // Print the points on the convex hull
//     console.log("Convex Hull Points:");
//     for (let i = 0; i < m; i++) {
//         console.log(`(${hull[i].x}, ${hull[i].y})`);
//     }
// }

// // Example usage
// const points = []; // Array to store input points

// // Create a readline interface for user input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Function to input points
// function inputPoints() {
//     rl.question("Enter the number of points: ", (n) => {
//         const numPoints = parseInt(n);
//         const pointInput = (i) => {
//             if (i < numPoints) {
//                 rl.question(`Enter x and y coordinates for point ${i + 1} (space-separated): `, (input) => {
//                     const [x, y] = input.split(' ').map(Number);
//                     points.push(new Point(x, y));
//                     pointInput(i + 1);
//                 });
//             } else {
//                 rl.close();
//                 points.sort((a, b) => a.x - b.x || a.y - b.y);
//                 convexHull(points);
//             }
//         };
//         pointInput(0);
//     });
// }

// inputPoints();

const readline = require('readline');

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
function inputPoints() {
    rl.question("Enter the number of points: ", (n) => {
        const numPoints = parseInt(n);
        const pointInput = (i) => {
            if (i < numPoints) {
                rl.question(`Enter x and y coordinates for point ${i + 1} (space-separated): `, (input) => {
                    const [x, y] = input.split(' ').map(Number);
                    points.push(new Point(x, y));
                    pointInput(i + 1);
                });
            } else {
                rl.close();
                points.sort((a, b) => a.x - b.x || a.y - b.y);
                Graham_Scan(points);
            }
        };
        pointInput(0);
    });
}

inputPoints();
