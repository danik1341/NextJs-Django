"use client";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import LoginIcon from "@mui/icons-material/Login";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/AuthContext";

export default function Home() {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  // return (
  //   <Grid container spacing={3} className="mx-auto my-6 max-w-[95vw]">
  //     {categories.length > 0
  //       ? categories.map((category, index) => (
  //           <Grid item xs={12} md={4} key={index}>
  //             <Card
  //               onClick={() => router.push(`/categories/${category.id}/`)}
  //               className=" cursor-pointer"
  //             >
  //               <CardHeader
  //                 avatar={<Avatar aria-label="category">C</Avatar>}
  //                 title={`${category.name}`}
  //                 subheader={`See all ${category.name} business`}
  //               />
  //             </Card>
  //           </Grid>
  //         ))
  //       : Array.from({ length: 4 }).map((_, index) => (
  //           <Grid item xs={12} md={4} key={index}>
  //             <Card>
  //               <CardHeader
  //                 avatar={
  //                   <Skeleton variant="circular" width={40} height={40} />
  //                 }
  //                 title={
  //                   <Skeleton
  //                     variant="text"
  //                     sx={{ fontSize: "1rem", width: "60%" }}
  //                   />
  //                 }
  //                 subheader={
  //                   <Skeleton
  //                     variant="text"
  //                     sx={{ fontSize: "0.875rem", width: "80%" }}
  //                   />
  //                 }
  //               />
  //             </Card>
  //           </Grid>
  //         ))}
  //   </Grid>
  // );
  return (
    <div className="flex flex-col items-center my-5 mx-auto">
      <Typography variant="h2">Welcome To My Reviews Page</Typography>
      <Grid
        container
        spacing={3}
        className="mx-auto my-6 max-w-[95vw] justify-center"
      >
        <Grid item xs={12} className="flex justify-center">
          <Card
            className=" cursor-pointer flex flex-col items-center hover:shadow-lg md:w-1/2 "
            onClick={() => router.push(`/categories/`)}
          >
            <CardHeader title="Categories" />
            {/* <CardMedia height='140'>
              <CategoryIcon />
            </CardMedia> */}
            <CardContent className="w-full h-[300px] flex flex-col items-center justify-between">
              <CategoryIcon className=" h-2/3 w-1/2" />
              <Typography variant="subtitle1" className=" mt-5 text-lg">
                See All The Categories Available
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {user ? (
          <>
            <Grid item xs={12} md={6}>
              <Card
                className=" cursor-pointer flex flex-col items-center hover:shadow-lg"
                onClick={() => router.push(`/categories/add/`)}
              >
                <CardHeader title="Add Category" />
                <CardContent className="w-full h-[250px] flex flex-col items-center justify-between">
                  <MapsUgcIcon className=" h-2/3 w-1/2" />
                  <Typography variant="subtitle1" className=" mt-5 text-lg">
                    Want to add a category for reviews ?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                className=" cursor-pointer flex flex-col items-center hover:shadow-lg"
                onClick={() => router.push(`/business/add/`)}
              >
                <CardHeader title="Add Business" />
                <CardContent className="w-full h-[250px] flex flex-col items-center justify-between">
                  <AddBusinessIcon className=" h-2/3 w-1/2" />
                  <Typography variant="subtitle1" className=" mt-5 text-lg">
                    Have a business/service you want reviews for ?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <Card
                className=" cursor-pointer flex flex-col items-center hover:shadow-lg"
                onClick={() => router.push(`/account/login`)}
              >
                <CardHeader title="Sign In" />
                <CardContent className="w-full h-[250px] flex flex-col items-center justify-between">
                  <LoginIcon className=" h-2/3 w-1/2" />
                  <Typography variant="subtitle1" className=" mt-5 text-lg">
                    Have an account? Sign In!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                className=" cursor-pointer flex flex-col items-center hover:shadow-lg"
                onClick={() => router.push(`/account/register`)}
              >
                <CardHeader title="Sign Up" />
                <CardContent className="w-full h-[250px] flex flex-col items-center justify-between">
                  <BorderColorIcon className=" h-2/3 w-1/2" />
                  <Typography variant="subtitle1" className=" mt-5 text-lg">
                    Don&apos;t have an account yet? Sign Up
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
