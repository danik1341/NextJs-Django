"use client";

import { AuthContext } from "@/utils/AuthContext";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      setSubmitError(true);
      return;
    } else {
      login({ username, password });
    }
  };

  return (
    <div className=" my-20 mx-auto max-w-[95vw]">
      <div>
        <Typography variant="h3" className="text-center">
          Login
        </Typography>
        <Card className=" mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
          <CardContent>
            <form className=" space-y-5">
              <div>
                <TextField
                  label="Username"
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  className=" bg-blue-500"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                {submitError && (
                  <Typography className="text-red-500 mt-3">
                    Username or Password incorrect
                  </Typography>
                )}
              </div>

              <div>
                <Link
                  href="/account/register"
                  className=" text-blue-400 underline underline-offset-2 transition delay-[0.3ms] hover:transition hover:delay-[0.3ms] hover:ease-in hover:text-blue-600"
                >
                  Don&apos;t have am account? Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Login;
