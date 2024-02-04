# from rest_framework.viewsets import ModelViewSet
# from ..models import travel
# from .serializers import travelSerializer
# from rest_framework import filters

# class travelViewSet(ModelViewSet):
#     queryset = travel.objects.all()
#     serializer_class = travelSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['Place_desc']

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         place_desc = self.request.query_params.get('place_desc', None)
#         print(f"Debug: place_desc={place_desc}")
#         if place_desc:
#             queryset = queryset.filter(Place_desc__contains=place_desc)
#         print(f"Debug: SQL query={queryset.query}")
#         return queryset
from rest_framework.viewsets import ModelViewSet
from ..models import travel
from .serializers import travelSerializer
from rest_framework.response import Response
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.core.exceptions import EmptyResultSet

class travelViewSet(ModelViewSet):
    queryset = travel.objects.all()
    serializer_class = travelSerializer

    def get_queryset(self):
        place_desc = self.request.query_params.get('place_desc', None)
        

        # Start with a base queryset that is not empty
        queryset = travel.objects.all()

        try:
            if place_desc:
                # Fetch all data from the database
                all_data = list(queryset.values('id', 'Place_desc'))

                # Calculate cosine similarity in-memory
                tfidf_vectorizer = TfidfVectorizer()
                tfidf_matrix = tfidf_vectorizer.fit_transform([item['Place_desc'] for item in all_data])
                user_vector = tfidf_vectorizer.transform([place_desc])
                cosine_similarities = cosine_similarity(user_vector, tfidf_matrix)
                similarity_scores = cosine_similarities[0]

                # Filter records based on similarity threshold
                threshold = 0.1  # Adjust as needed
                similar_records = [item for item, score in zip(all_data, similarity_scores) if score > threshold]
                

                # Update the base queryset with filtered records
                queryset = queryset.filter(id__in=[item['id'] for item in similar_records])
                

        except EmptyResultSet:
            # Handle the EmptyResultSet exception
            queryset = travel.objects.none()

        return queryset
