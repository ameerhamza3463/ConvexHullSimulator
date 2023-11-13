#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Structure for a 2D point
typedef struct {
    int x;
    int y;
} Point;

Point p0;

// Function to swap two points
void swap(Point* a, Point* b) {
    Point temp = *a;
    *a = *b;
    *b = temp;
}

// Function to find the orientation of three points (p, q, r)
int orientation(Point p, Point q, Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counter-clockwise
}

// Function to compute the square of the distance between two points
int distSq(Point p, Point q) {
    return (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
}

// Function to compare two points for qsort
int compare(const void* vp1, const void* vp2) {
    Point* p1 = (Point*)vp1;
    Point* p2 = (Point*)vp2;

    int o = orientation(p0, *p1, *p2);
    if (o == 0) {
        return (distSq(p0, *p2) >= distSq(p0, *p1)) ? -1 : 1;
    }
    return (o == 2) ? -1 : 1;
}

// Function to find the convex hull using the Graham Scan algorithm
void Graham_Scan(Point points[], int n) {
    // Find the point with the lowest y-coordinate (and leftmost if tied)
    int ymin = points[0].y, min = 0;
    for (int i = 1; i < n; i++) {
        int y = points[i].y;
        if ((y < ymin) || (ymin == y && points[i].x < points[min].x)) {
            ymin = points[i].y;
            min = i;
        }
    }

    // Place the point with the lowest y-coordinate at the beginning
    swap(&points[0], &points[min]);
    p0 = points[0];

    // Sort the rest of the points based on polar angle with p0
    qsort(&points[1], n - 1, sizeof(Point), compare);

    // Initialize the convex hull
    Point hull[n];
    int m = 0;

    // Add the first three points to the hull
    hull[m++] = points[0];
    hull[m++] = points[1];
    hull[m++] = points[2];

    // Process the rest of the points to construct the convex hull
    for (int i = 3; i < n; i++) {
        // Remove points that create a clockwise turn
        while (m > 1 && orientation(hull[m - 2], hull[m - 1], points[i]) != 2) {
            m--;
        }
        hull[m++] = points[i];
    }

    // Print the points on the convex hull
    printf("Convex Hull Points:\n");
    for (int i = 0; i < m; i++) {
        printf("(%d, %d)\n", hull[i].x, hull[i].y);
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

    Graham_Scan(points, n);

    return 0;
}

