from django.contrib.auth.models import User, Group
from rest_framework import serializers
from reviews.models import Review, Business, Category


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
        )

        return user

    class Meta:
        model = User
        fields = ["url", "username", "password", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class ReviewReadSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Review
        depth = 1
        fields = "__all__"


class ReviewWriteSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = ["id", "url", "title", "content", "stars", "business"]


class BusinessReadSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    reviews = ReviewReadSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        depth = 1
        fields = "__all__"


class BusinessWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"


class CategoryReadSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    business = BusinessReadSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        depth = 1
        fields = "__all__"


class CategoryWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
