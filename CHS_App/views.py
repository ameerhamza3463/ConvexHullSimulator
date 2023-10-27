from django.shortcuts import render, redirect

# Create your views here.
def main(request):
    return render(request, "CHS_App/main.html")

def algorithm(request, algorithm):
    algorithms = ['brute_force', 'jarvis_march', 'gram_scan', 'quick_hull', 'research_paper']
    if algorithm not in algorithms:
        return redirect("CHS_App:page_not_found_404")

    return render(request, 'CHS_App/algorithm.html', {"algorithm":algorithm})

def page_not_found_404(request):
    return render(request, 'CHS_App/page_not_found.html')