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

// Function to find the convex hull using Jarvis March algorithm
function JarvisMarch(points) {
    const n = points.length;
    if (n < 3) return []; // Convex hull is not possible with less than 3 points

    // Initialize the convex hull as an empty array
    const hullIndices = new Array(n).fill(-1);

    // Find the point with the leftmost x-coordinate (the starting point)
    let leftmost = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    // Start from the leftmost point and move counterclockwise to build the hull
    let current = leftmost;
    let next;
    let hullIndex = 0;
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
        hullIndex++;
    } while (current !== leftmost);

    // Construct and return the convex hull as an array of points
    const convexHull = [];
    for (let i = 0; i < n; i++) {
        if (hullIndices[i] !== -1) {
            convexHull.push(points[hullIndices[i]]);
        }
    }

    return convexHull;
}

// Function to input points
function InputPoints() {
    
    // const points = [];
    // rl.question("Enter the number of points: ", (n) => {
    //     const numPoints = parseInt(n);
    //     const pointInput = (i) => {
    //         if (i < numPoints) {
    //             rl.question(`Enter x and y coordinates for point ${i + 1} (space-separated): `, (input) => {
    //                 const [x, y] = input.split(' ').map(Number);
    //                 points.push(new Point(x, y));
    //                 pointInput(i + 1);
    //             });
    //         } else {
    //             rl.close();
    //             const convexHull = JarvisMarch(points);
    //             console.log("\nConvex Hull Points:");
    //             console.log(convexHull);
    //         }
    //     };
    //     pointInput(0);
    // });
}

// Start by inputting points
InputPoints();
