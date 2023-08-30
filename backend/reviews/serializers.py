from django.contrib.auth.models import User, Group
from rest_framework import serializers
from reviews.models import Review, Business, Category


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = "__all__"


class BusinessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        depth = 1
        fields = "__all__"


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    business = BusinessSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        depth = 1
        fields = "__all__"
