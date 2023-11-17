#include <stdio.h>

// Define a structure for a 2D point
typedef struct {
    int x;
    int y;
} Point;

// Function to check if three points are in a counter-clockwise order
int orientation(Point p, Point q, Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counter-clockwise
}

// Function to find the convex hull using Jarvis March algorithm
void convexHull(Point points[], int n) {
    if (n < 3) return; // Convex hull is not possible with less than 3 points

    // Initialize the convex hull as an empty list
    int hullIndices[n];
    for (int i = 0; i < n; i++) {
        hullIndices[i] = -1;
    }

    // Find the point with the leftmost x-coordinate (the starting point)
    int leftmost = 0;
    for (int i = 1; i < n; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    // Start from the leftmost point and move counterclockwise to build the hull
    int current = leftmost, next;
    int hullIndex = 0;
    do {
        hullIndices[hullIndex] = current;
        next = (current + 1) % n;
        for (int i = 0; i < n; i++) {
            // Find the most counterclockwise point relative to the current point
            if (orientation(points[current], points[i], points[next]) == 2) {
                next = i;
            }
        }
        current = next;
        hullIndex++;
    } while (current != leftmost);

    // Print the points on the convex hull
    printf("Convex Hull Points:\n");
    for (int i = 0; i < n; i++) {
        if (hullIndices[i] != -1) {
            printf("(%d, %d)\n", points[hullIndices[i]].x, points[hullIndices[i]].y);
        }
    }
}

int main() {
    int n;
    printf("Enter the number of points: ");
    scanf("%d", &n);
    Point points[n];
    for (int i = 0; i < n; i++) {
        printf("Enter x and y coordinates for point %d: ", i + 1);
        scanf("%d %d", &points[i].x, &points[i].y);
    }

    convexHull(points, n);

    return 0;
}
