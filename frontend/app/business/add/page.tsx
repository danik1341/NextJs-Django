"use client";

import { AuthContext } from "@/utils/AuthContext";
import {
  Button,
  Card,
  CardContent,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type AddBusinessProps = {};

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

const AddBusiness: React.FC<AddBusinessProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const { user, accessToken, cookieValue } = useContext(AuthContext);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setPriceRange(event.target.value);
  };

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async () => {
    if (user) {
      try {
        const businessResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/`,
          {
            name,
            description,
            street_address: streetAddress,
            city,
            region,
            postal_code: postalCode,
            country,
            website,
            phone,
            hours,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (businessResponse.status === 201) {
          const newBusiness = businessResponse.data;
          const categoryResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}/`
          );
          const existingCategory = categoryResponse.data;
          const businessUrls = existingCategory.business.map(
            (business: any) => business.url
          );
          const updatedBusinessUrls = [...businessUrls, newBusiness.url];

          const updatedCategory = {
            name: existingCategory.name,
            ordinal: existingCategory.ordinal,
            business: updatedBusinessUrls,
          };

          await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}/`,
            updatedCategory,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          router.push(`/categories/${categoryId}`);
        } else {
          setSubmitError(true);
          setErrorMsg("Failed to add business. Please try again.");
        }
      } catch (error) {
        setSubmitError(true);
        setErrorMsg("An error occurred while adding the category.");
        console.error(error);
      }
    }
  };

  const checkUser = async () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const checkedUser = checkUser();
    if (!checkedUser) {
      router.push(`/categories/`);
    }
  });

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
    <div className=" my-20 mx-auto max-w-[95vw]">
      <Typography variant="h3" className="text-center">
        Add Business
      </Typography>

      <Card className=" mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
        <CardContent>
          <form className=" space-y-5">
            <div>
              <TextField
                fullWidth
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <InputLabel shrink htmlFor="price-range">
                Price Range
              </InputLabel>
              <Select
                native
                value={priceRange}
                className=" w-full"
                onChange={handleChange}
                inputProps={{
                  id: "price-range",
                }}
              >
                <option value={"$"}>$ - Very Cheep</option>
                <option value={"$$"}>$$ - Cheep</option>
                <option value={"$$$"}>$$$ - Moderate</option>
                <option value={"$$$$"}>$$$$ - Expensive</option>
                <option value={"$$$$$"}>$$$$$ - Very Expensive</option>
              </Select>
            </div>

            <div>
              <TextField
                fullWidth
                label="Street Address"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Region"
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Hours"
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div>
              <InputLabel shrink htmlFor="category">
                Category
              </InputLabel>
              <Select
                native
                className=" w-full"
                onChange={handleChangeCategory}
                inputProps={{
                  id: "category",
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Button
                variant="contained"
                className=" bg-blue-500 w-full"
                onClick={handleSubmit}
              >
                Add Business
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
export default AddBusiness;
