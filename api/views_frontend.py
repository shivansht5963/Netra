from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def home_view(request):
    return render(request, 'home.html')

@ensure_csrf_cookie
def report_view(request):
    return render(request, 'report.html')

def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    return render(request, 'signup.html')

@login_required
def stats_view(request):
    return render(request, 'stats.html')