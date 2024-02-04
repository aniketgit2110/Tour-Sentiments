from django.db import models

# Create your models here.
class travel(models.Model):
    City=models.CharField(max_length=255)
    Place = models.CharField(max_length=255)
    Ratings = models.FloatField()
    Distance = models.CharField(max_length=255)
    Place_desc = models.TextField()

    def __str__(self):
        return f"{self.Place} in {self.City}"
