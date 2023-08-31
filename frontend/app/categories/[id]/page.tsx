"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AverageReview from "@/components/AverageReview";

type Review = {
  stars: number;
};

type Business = {
  website: string;
  name: string;
  description: string;
  price_range: string;
  street_address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  phone: string;
  hours: string;
  reviews: Review[];
  id: number;
};

type Category = {
  url: string;
  name: string;
  ordinal: number;
  business: Business[];
  id: number;
};

type CategoryDetailsProps = {
  params: { id: string };
};

const fetchCategory = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching category data:", err);
    throw err;
  }
};

const Category: React.FC<CategoryDetailsProps> = ({ params }) => {
  const id = params.id;
  const [category, setCategory] = useState<Category>();
  const [price, setPrice] = useState<string>("");
  const [numReviews, setNumReviews] = useState<number | null>();
  const [avgReview, setAvgReview] = useState<number | null>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategory(id);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBusinessClick = (id: number) => {
    router.push(`/business/${id}`);
  };

  const getAvgReviews = (reviews: Review[]) => {
    let avgReviews = 0;
    let totalReviews = 0;
    if (reviews) {
      reviews.map((review) => {
        totalReviews += review.stars;
      });
      avgReviews = totalReviews / reviews.length;
    }
    return avgReviews;
  };

  const handleClearFilters = () => {
    setPrice("");
    setNumReviews(null);
    setAvgReview(null);
  };

  return (
    <Grid container className=" mt-6 max-w-[95vw]">
      <Grid item xs={12} md={3}>
        <Box className=" my-0 mx-6 space-y-2">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Filter the Results</Typography>
              <Divider />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="price">Price</InputLabel>
                <Select
                  labelId="price"
                  id="priceInput"
                  label="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                >
                  <MenuItem value={"$"}>Very Cheap</MenuItem>
                  <MenuItem value={"$$"}>Cheap</MenuItem>
                  <MenuItem value={"$$$"}>Moderate</MenuItem>
                  <MenuItem value={"$$$$"}>Expensive</MenuItem>
                  <MenuItem value={"$$$$$"}>Very Expensive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="numReviews">Number of Reviews</InputLabel>
                <Select
                  labelId="numReviews"
                  id="numReviewsInput"
                  label="Number of Reviews"
                  onChange={(e) => setNumReviews(Number(e.target.value))}
                  value={
                    numReviews !== undefined && numReviews !== null
                      ? numReviews.toString()
                      : ""
                  }
                  defaultValue=""
                >
                  <MenuItem value={5}>5+</MenuItem>
                  <MenuItem value={10}>10+</MenuItem>
                  <MenuItem value={15}>15+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="avgReview">Average Review</InputLabel>
                <Select
                  labelId="avgReview"
                  id="avgReviewInput"
                  label="Average Review"
                  onChange={(e) => setAvgReview(Number(e.target.value))}
                  value={
                    avgReview !== undefined && avgReview !== null
                      ? avgReview.toString()
                      : ""
                  }
                  defaultValue=""
                >
                  <MenuItem value={3}>3+ Stars</MenuItem>
                  <MenuItem value={4}>4+ Stars</MenuItem>
                  <MenuItem value={5}>5+ Stars</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                className=" mt-4"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} md={9} className=" space-y-5">
        {category && category.business.length > 0
          ? category?.business.map(
              (business, index) =>
                (!price || price === business.price_range) &&
                (!numReviews || business.reviews.length >= numReviews) &&
                (!avgReview ||
                  getAvgReviews(business.reviews) >= avgReview) && (
                  <Card
                    className=" cursor-pointer"
                    key={index}
                    onClick={() => handleBusinessClick(business.id)}
                  >
                    <Box>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="h5">
                              {business.name}
                            </Typography>
                            <Typography variant="subtitle1">
                              {business.price_range}
                            </Typography>
                            <Link
                              variant="subtitle1"
                              href={business.website}
                              target="_blank"
                            >
                              Business Website
                            </Link>
                            <Typography variant="subtitle1">
                              {business.phone}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className=" text-gray-500"
                            >
                              {business.description}
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <AverageReview
                              value={getAvgReviews(business.reviews)}
                            />
                            <Typography variant="subtitle1">
                              {business.hours}
                            </Typography>
                            <Typography variant="subtitle1">
                              {business.street_address} {business.city},{" "}
                              {business.region} {business.postal_code}{" "}
                              {business.country}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Card>
                )
            )
          : Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <Box>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={6}>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1.5rem", width: "70%" }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "30%" }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "50%" }}
                          className=" bg-blue-500"
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "50%" }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "70%" }}
                        />
                      </Grid>

                      <Grid item xs={4} padding={1}>
                        <AverageReview value={0} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
            ))}
      </Grid>
    </Grid>
  );
};
export default Category;
