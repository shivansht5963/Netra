from .serializer import URLSerializer, SignupSerializer, ReportedURLSSerializer
from ml.detection import detect
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import ReportedURL
from rest_framework import pagination
from rest_framework import status



class SignUPView(generics.CreateAPIView):
    serializer_class = SignupSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            data.save()
            return Response(status=status.HTTP_201_CREATED)

        else:
            return Response(data.errors)

class DetectView(generics.GenericAPIView):
    serializer_class = URLSerializer
    def post(self, request):
        try:
            data = self.serializer_class(data=request.data)
            if data.is_valid():
                url = data.validated_data['url']
                try:
                    phish = detect(url)
                    return Response(phish)
                except Exception as e:
                    return Response(
                        {'error': str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            else:
                return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ReportView(generics.GenericAPIView):
    serializer_class = URLSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            user = request.user

            obj, created = ReportedURL.objects.get_or_create(url=data.validated_data['url'], user=user)
            
            if created:
                return Response({
                    'msg' : "Successfully saved"
                })
            else:
                return Response({
                    'msg': 'You have already reported the url'
                })
        else:
            return Response(data.errors)


class StatsUserView(generics.ListAPIView):
    queryset = ReportedURL.objects.all()
    serializer_class = ReportedURLSSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = pagination.PageNumberPagination