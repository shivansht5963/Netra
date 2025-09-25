from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from api import views_frontend

urlpatterns = [
    path('', views_frontend.home_view, name='home'),
    path('report/', views_frontend.report_view, name='report'),
    path('signup/', views_frontend.signup_view, name='signup'),
    path('stats/', views_frontend.stats_view, name='stats'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
