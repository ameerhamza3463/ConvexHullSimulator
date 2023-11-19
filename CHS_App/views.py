from django.shortcuts import render, redirect


# Create your views here.
def main(request):
    return render(request, "CHS_App/main.html")


def algorithm(request, algorithm):
    algorithms = [
        "brute_force",
        "jarvis_march",
        "graham_scan",
        "quick_hull",
        "research_paper",
    ]
    if algorithm not in algorithms:
        return page_not_found_404(request, exception=404)
        # return redirect("CHS_App:page_not_found_404")

    algorithmTitle = "None"
    colorScheme = "None"
    if algorithm == algorithms[0]:
        algorithmTitle = "Brute Force"
        colorScheme = "primary"
    elif algorithm == algorithms[1]:
        algorithmTitle = "Jarvis March"
        colorScheme = "secondary"
    elif algorithm == algorithms[2]:
        algorithmTitle = "Graham Scan"
        colorScheme = "success"
    elif algorithm == algorithms[3]:
        algorithmTitle = "Quick Hull"
        colorScheme = "danger"
    else:
        algorithmTitle = "Research Paper"
        colorScheme = "warning"

    return render(
        request,
        "CHS_App/algorithm.html",
        {
            "algorithm": algorithm,
            "algorithmTitle": algorithmTitle,
            "colorScheme": colorScheme,
        },
    )


def line_intersection(request, num):
    colorScheme = "None"
    algorithm = "None"
    if num == 1:
        algorithmTitle = "Line Intersection 01"
        algorithm = "line_intersection_01"
        colorScheme = "info"
    elif num == 2:
        algorithmTitle = "Line Intersection 02"
        algorithm = "line_intersection_02"
        colorScheme = "dark"
    else:
        return redirect("CHS_App:page_not_found_404")
    return render(
        request,
        "CHS_App/line_intersection.html",
        {
            "algorithm": algorithm,
            "algorithmTitle": algorithmTitle,
            "colorScheme": colorScheme,
        },
    )


def page_not_found_404(request, exception):
    return render(request, "CHS_App/page_not_found.html", status=404)
