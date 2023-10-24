from django.urls import path
from . import views


app_name = 'CHS_App'
urlpatterns = [
    path('', views.main, name="main"),
]
