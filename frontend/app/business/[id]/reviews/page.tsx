"use client";

import { AuthContext } from "@/utils/AuthContext";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type AddReviewProps = {
  params: { id: string };
};

type Business = {
  url: string;
  name: string;
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

const AddReview: React.FC<AddReviewProps> = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [stars, setStars] = useState<string>("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [business, setBusiness] = useState<Business>();

  const { user } = useContext(AuthContext);

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

  function getCookie(name: string): string | null {
    let cookieValue: string | null = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleSubmit = async () => {
    const csrftoken: string | null = getCookie("csrftoken");

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    };

    const body = {
      title,
      content: comment,
      stars,
      business: business!.url,
      user: user.url,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/`,
        body,
        config
      );
      if (response.status === 201) {
        console.log("Review submitted successfully:", response.data);
        router.back();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };

  return (
    <div className="mt-20 max-w-[95vw]">
      {business ? (
        <div>
          <Typography variant="h3" className="md:text-center">
            Creating a Review For: {business.name}
          </Typography>

          <div className="mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
            <FormControl fullWidth className="my-4 mx-0">
              <InputLabel id="stars" className="bg-white">
                Stars Rating Out of 5
              </InputLabel>
              <Select
                labelId="stars"
                id="starsComponent"
                label="stars"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={4.5}>4.5</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth className="my-4 mx-0">
              <TextField
                id="titleComponent"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth className="my-4 mx-0">
              <TextField
                id="commentComponent"
                label="Tell us about your experience here"
                multiline
                minRows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500 w-full md:w-1/3"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </div>
        </div>
      ) : (
        <div className=" space-y-10">
          <Skeleton
            variant="text"
            className="md:text-center"
            sx={{ fontSize: "3rem" }}
          />

          <div className="mt-9 w-full py-0 px-3 md:w-1/2 mx-auto space-y-5">
            <Skeleton variant="rounded" className=" w-full md:w-1/2 h-14" />
            <Skeleton variant="rounded" className=" w-full md:w-1/2 h-14" />
            <Skeleton variant="rounded" className=" w-full md:w-1/2 h-32" />
            <Skeleton
              variant="rounded"
              className=" w-full md:w-1/3 h-10 bg-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AddReview;
