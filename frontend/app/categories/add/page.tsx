"use client";

import { AuthContext } from "@/utils/AuthContext";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type AddCategoryProps = {};

const AddCategory: React.FC<AddCategoryProps> = () => {
  const [name, setName] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const { user, accessToken } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (user) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 201) {
          router.push("/categories/");
        } else {
          setSubmitError(true);
          setErrorMsg("Failed to add category. Please try again.");
        }
      } catch (error) {
        setSubmitError(true);
        setErrorMsg("An error occurred while adding the category.");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/categories/");
    }
  });

  return (
    <div className=" my-20 mx-auto max-w-[95vw]">
      <Typography variant="h3" className="text-center">
        Add Category
      </Typography>
      <Card className=" mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
        <CardContent>
          <form className=" space-y-5">
            <div>
              <TextField
                fullWidth
                label="Category Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className=" bg-blue-500"
                onClick={handleSubmit}
              >
                Add
              </Button>
              {submitError && (
                <Typography className="text-red-500 mt-3">
                  {errorMsg}
                </Typography>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default AddCategory;
