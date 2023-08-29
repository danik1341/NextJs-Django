"use client";

import { Avatar, Card, CardHeader, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
  name: string;
  id: number;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`
    );
    console.log(response.data.results);

    return response.data.results;
  } catch (err) {
    console.error("Error fetching categories data:", err);
    throw err;
  }
};

export default function Home() {
  const data = fetchCategories();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3} className="mx-auto my-6 max-w-[95vw]">
      {categories.map((category, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card>
            <CardHeader
              avatar={<Avatar aria-label="category">C</Avatar>}
              title={`${category.name}`}
              subheader={`See all ${category.name} business`}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
