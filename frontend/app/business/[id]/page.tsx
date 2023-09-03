"use client";

import AverageReview from "@/components/AverageReview";
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
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Review = {
  stars: number;
  title: string;
  content: string;
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

type BusinessProps = {
  params: { id: string };
};

const fetchBusiness = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/${id}/`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching category data:", err);
    throw err;
  }
};

const Business: React.FC<BusinessProps> = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [business, setBusiness] = useState<Business>();
  const [reviewFilter, setReviewFilter] = useState<string>("0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBusiness(id);
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchData();
  }, [id]);

  const getAvgReviews = () => {
    let avgReviews = 0;
    let totalReviews = 0;
    if (business) {
      business.reviews.map((review) => {
        totalReviews += review.stars;
      });
      avgReviews = totalReviews / business.reviews.length;
    }
    return avgReviews;
  };

  return (
    <div>
      <Grid container className=" mt-10 md:mt-20 max-w-[95vw] px-6">
        <Grid item xs={12} md={6}>
          {business ? (
            <Typography variant="h2">{business.name}</Typography>
          ) : (
            <Skeleton
              variant="text"
              sx={{ fontSize: "3.75rem", width: "50%" }}
            />
          )}
          {business ? (
            <Typography variant="h4">{business.price_range}</Typography>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "2rem", width: "30%" }} />
          )}
          <AverageReview value={business ? getAvgReviews() : 0} />

          <div className=" mt-4">
            <Button
              variant="contained"
              className=" bg-blue-600"
              onClick={() => router.push(`/business/${id}/reviews/`)}
            >
              Write a Review
            </Button>
          </div>

          <div className=" mt-4">
            {business ? (
              <Typography paragraph={true}>{business.description}</Typography>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "80%" }}
              />
            )}
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <List>
              <ListItem>
                <ListItemText
                  primary="Website"
                  secondary={
                    business ? (
                      <Link href={business.website} target="_blank">
                        {business.website}
                      </Link>
                    ) : (
                      <Skeleton
                        variant="text"
                        className=" bg-blue-500"
                        sx={{ fontSize: "0.875rem", width: "30%" }}
                      />
                    )
                  }
                />
              </ListItem>

              <ListItem>
                {business ? (
                  <ListItemText
                    primary="Address"
                    secondary={`${business.street_address}, ${business.city}, ${business.region}, ${business.postal_code}, ${business.country}`}
                  />
                ) : (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", width: "50%" }}
                  />
                )}
              </ListItem>

              <ListItem>
                {business ? (
                  <ListItemText primary="Phone" secondary={business.phone} />
                ) : (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", width: "50%" }}
                  />
                )}
              </ListItem>

              <ListItem>
                {business ? (
                  <ListItemText primary="Hours" secondary={business.hours} />
                ) : (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", width: "50%" }}
                  />
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      <Grid container className=" mt-20 max-w-[95vw] px-6">
        <Grid item xs={12} md={3}>
          <Box>
            <Grid container className=" space-y-5">
              <Grid item xs={12}>
                <Typography variant="h5">Filter the Reviews</Typography>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="reviews" className=" bg-white">
                    Review
                  </InputLabel>
                  <Select
                    labelId="reviews"
                    id="reviewsComponent"
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                  >
                    <MenuItem value={0} className="hidden"></MenuItem>
                    <MenuItem value={1}>1+ Stars</MenuItem>
                    <MenuItem value={2}>2+ Stars</MenuItem>
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
                  className=" hover:bg-fuchsia-200"
                  onClick={() => setReviewFilter("0")}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} className=" my-0 mx-auto">
          {business && business.reviews ? (
            business.reviews.map(
              (review, index) =>
                parseInt(reviewFilter) <= review.stars && (
                  <Card key={index} className=" my-6">
                    <Box>
                      <CardContent>
                        <AverageReview value={review.stars} />
                        <Typography variant="h5">{review.title}</Typography>
                        <Typography variant="subtitle1">
                          {review.content}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                )
            )
          ) : (
            <div>Stam</div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default Business;
