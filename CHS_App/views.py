from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request, "CHS_App/main.html")