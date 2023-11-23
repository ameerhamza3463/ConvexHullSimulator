from django.shortcuts import render, redirect
from .models import AlgorithmComplexity


# Create your views here.
def main(request):
    return render(request, "CHS_App/main.html")


def algorithm(request, algorithm):
    algorithms = [
        "brute_force",
        "jarvis_march",
        "graham_scan",
        "quick_hull",
        "monotone_chain",
    ]
    if algorithm not in algorithms:
        return page_not_found_404(request, exception=404)
        # return redirect("CHS_App:page_not_found_404")

    algorithmTitle = "None"
    research_paper_reference = ""
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
        algorithmTitle = "Monotone Chain"
        colorScheme = "warning"
        research_paper_reference = (
            "https://scholarworks.calstate.edu/downloads/2z10ww05b"
        )

    algorithm_complexity = AlgorithmComplexity.objects.get(
        algorithm_name=algorithmTitle
    )

    return render(
        request,
        "CHS_App/algorithm.html",
        {
            "algorithm": algorithm,
            "algorithmTitle": algorithmTitle,
            "colorScheme": colorScheme,
            "research_paper_reference": research_paper_reference,
            "algorithm_complexity": algorithm_complexity,
        },
    )


def line_intersection(request, num):
    colorScheme = "None"
    algorithm = "None"
    if num == 1:
        algorithmTitle = "CCW"
        algorithm = "ccw"
        colorScheme = "info"
    elif num == 2:
        algorithmTitle = "Slope Line Method"
        algorithm = "slope_line_method"
        colorScheme = "dark"
    elif num == 3:
        algorithmTitle = "Cramer's Rule"
        algorithm = "cramers_rule"
        colorScheme = "success"
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


def team(request):
    return render(request, "CHS_App/team.html")


def page_not_found_404(request, exception):
    return render(request, "CHS_App/page_not_found.html", status=404)
