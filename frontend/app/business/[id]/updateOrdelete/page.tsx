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

type UpdateOrDeleteBusinessProps = {
  params: { id: string };
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
};

const UpdateOrDeleteBusiness: React.FC<UpdateOrDeleteBusinessProps> = ({
  params,
}) => {
  const id = params.id;
  const [businessData, setBusinessData] = useState<Business>();
  const fetchBusinessData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/${id}/`
      );
      setBusinessData(response.data);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const [name, setName] = useState<string>(businessData?.name || "");
  const [description, setDescription] = useState<string>(
    businessData?.description || ""
  );
  const [priceRange, setPriceRange] = useState<string>(
    businessData?.price_range || ""
  );
  const [streetAddress, setStreetAddress] = useState<string>(
    businessData?.street_address || ""
  );
  const [city, setCity] = useState<string>(businessData?.city || "");
  const [region, setRegion] = useState<string>(businessData?.region || "");
  const [postalCode, setPostalCode] = useState<string>(
    businessData?.postal_code || ""
  );
  const [country, setCountry] = useState<string>(businessData?.country || "");
  const [website, setWebsite] = useState<string>(businessData?.website || "");
  const [phone, setPhone] = useState<string>(businessData?.phone || "");
  const [hours, setHours] = useState<string>(businessData?.hours || "");

  useEffect(() => {
    if (businessData) {
      setName(businessData.name || "");
      setDescription(businessData.description || "");
      setPriceRange(businessData.price_range || "");
      setStreetAddress(businessData.street_address || "");
      setCity(businessData.city || "");
      setRegion(businessData.region || "");
      setPostalCode(businessData.postal_code || "");
      setCountry(businessData.country || "");
      setWebsite(businessData.website || "");
      setPhone(businessData.phone || "");
      setHours(businessData.hours || "");
    }
  }, [businessData]);

  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const { user, accessToken } = useContext(AuthContext);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setPriceRange(event.target.value);
  };

  const handleSubmit = async () => {
    if (user) {
      try {
        const updatedBusiness = {
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
          user: user.url,
        };

        const businessResponse = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/${id}/`,
          updatedBusiness,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (businessResponse.status === 200) {
          // Business updated successfully
          router.push(`/business/${id}`);
        } else {
          setSubmitError(true);
          setErrorMsg("Failed to update business. Please try again.");
        }
      } catch (error) {
        setSubmitError(true);
        setErrorMsg("An error occurred while updating the business.");
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 204) {
          router.push(`/categories/`);
        } else {
        }
      } catch (error) {
        console.error("Error deleting business:", error);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push(`/categories/${id}/`);
    }
  });

  return (
    <div className=" my-20 mx-auto max-w-[95vw]">
      <Typography variant="h3" className="text-center">
        Update/Delete Business
      </Typography>

      <Card className=" mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
        <CardContent>
          <form className=" space-y-5">
            <div>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Description"
                value={description}
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
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className=" space-y-4">
              <Button
                variant="contained"
                className=" bg-green-500 w-full hover:shadow-green-400 hover:bg-green-600"
                onClick={handleSubmit}
              >
                Update Business
              </Button>

              <Button
                variant="contained"
                className=" bg-red-500 hover:shadow-red-400 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete Business
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
export default UpdateOrDeleteBusiness;
