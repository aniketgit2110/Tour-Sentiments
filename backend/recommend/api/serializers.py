from rest_framework.serializers import ModelSerializer
from ..models import travel

class travelSerializer(ModelSerializer):
    class Meta:
        model = travel
        fields = ('City','Place','Ratings','Distance','Place_desc')