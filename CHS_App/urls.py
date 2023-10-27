from django.urls import path
from . import views


app_name = 'CHS_App'
urlpatterns = [
    path('', views.main, name="main"),
    path(
        "algorithm/<str:algorithm>/",
        views.algorithm,
        name="algorithm",
    ),
    path('page404/', views.page_not_found_404, name="page_not_found_404"),
]
