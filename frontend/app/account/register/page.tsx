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

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, error } = useContext(AuthContext);
  console.log(error);

  const handleSubmit = async () => {
    if (
      username === "" ||
      password === "" ||
      password2 === "" ||
      email === ""
    ) {
      setSubmitError(true);
      setErrorMsg("All fields are required");
      console.error("All fields are required");
      return;
    }
    if (password !== password2) {
      setSubmitError(true);
      setErrorMsg("passwords do not match");
      console.error("passwords do not match");
      return;
    }

    if (error) {
      setSubmitError(true);
      console.error(error);
      setErrorMsg(error);
    }

    await register({ email, username, password });
  };

  return (
    <div className=" my-20 mx-auto max-w-[95vw]">
      <div>
        <Typography variant="h3" className="text-center">
          Register
        </Typography>

        <Card className=" mt-9 w-full py-0 px-3 md:w-1/2 mx-auto">
          <CardContent>
            <form className=" space-y-5">
              <div>
                <TextField
                  fullWidth
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
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
                    {errorMsg}
                  </Typography>
                )}
              </div>

              <div>
                <Link
                  href="/account/login"
                  className=" text-blue-400 underline underline-offset-2 transition delay-[0.3ms] hover:transition hover:delay-[0.3ms] hover:ease-in hover:text-blue-600"
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Register;
