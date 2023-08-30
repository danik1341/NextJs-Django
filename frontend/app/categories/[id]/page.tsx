"use client";

import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AverageReview from "@/components/AverageReview";

type Review = {
  stars: number;
};

type Business = {
  url: string;
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

  return (
    <Grid container className=" mt-6 max-w-[95vw]">
      <Grid item xs={12} md={3}>
        todo filters
      </Grid>

      <Grid item xs={12} md={9} className=" space-y-5">
        {category?.business.map((business, index) => (
          <Card
            className=" cursor-pointer"
            key={index}
            onClick={() => handleBusinessClick(business.id)}
          >
            <Box>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h5">{business.name}</Typography>
                    <Typography variant="subtitle1">
                      {business.price_range}
                    </Typography>
                    <Link
                      variant="subtitle1"
                      href={business.url}
                      target="_blank"
                    >
                      Business Website
                    </Link>
                    <Typography variant="subtitle1">
                      {business.phone}
                    </Typography>
                    <Typography variant="subtitle1" className=" text-gray-500">
                      {business.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <AverageReview value={getAvgReviews(business.reviews)} />
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
        ))}
      </Grid>
    </Grid>
  );
};
export default Category;
