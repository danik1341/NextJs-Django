"use client";

import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [business, setBusiness] = useState<Business>();

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
  return (
    <Grid container className=" mt-20 max-w-[95vw] p-4">
      <Grid item xs={12} md={6}>
        <Typography variant="h2">{business?.name}</Typography>
        <Typography variant="h4">{business?.price_range}</Typography>
        <Typography variant="subtitle1">Todo Review Component</Typography>

        <div className=" mt-4">
          <Button variant="contained" className=" bg-blue-600">
            Write a Review
          </Button>
        </div>

        <div className=" mt-4">
          <Typography paragraph={true}>{business?.description}</Typography>
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <List>
            <ListItem>
              <ListItemText
                primary="Website"
                secondary={
                  <Link href={business?.url} target="_blank">
                    {business?.url}
                  </Link>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Address"
                secondary={`${business?.street_address}, ${business?.city}, ${business?.region}, ${business?.postal_code}, ${business?.country}`}
              />
            </ListItem>

            <ListItem>
              <ListItemText primary="Phone" secondary={business?.phone} />
            </ListItem>

            <ListItem>
              <ListItemText primary="Hours" secondary={business?.hours} />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Business;
