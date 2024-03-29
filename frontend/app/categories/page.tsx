"use client";

import { Avatar, Card, CardHeader, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  name: string;
  id: number;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`
    );

    return response.data.results;
  } catch (err) {
    console.error("Error fetching categories data:", err);
    throw err;
  }
};

export default function CategoryPage() {
  const data = fetchCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

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
      {categories.length > 0
        ? categories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                onClick={() => router.push(`/categories/${category.id}/`)}
                className=" cursor-pointer"
              >
                <CardHeader
                  avatar={<Avatar aria-label="category">C</Avatar>}
                  title={`${category.name}`}
                  subheader={`See all ${category.name} business`}
                />
              </Card>
            </Grid>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardHeader
                  avatar={
                    <Skeleton variant="circular" width={40} height={40} />
                  }
                  title={
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "60%" }}
                    />
                  }
                  subheader={
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "0.875rem", width: "80%" }}
                    />
                  }
                />
              </Card>
            </Grid>
          ))}
    </Grid>
  );
}
