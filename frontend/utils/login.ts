import axios from "axios";

interface LoginResponse {
  user: any;
  access: string;
  cookieValue: string;
}

const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  let accessToken: string | null = null;

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const body = {
    username,
    password,
  };

  try {
    const { data: accessResponse } = await axios.post<{
      access: string;
      refresh: string;
    }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/`, body, config);
    accessToken = accessResponse.access;

    // Simulate setting the cookie, replace with actual logic based on your authentication setup
    // in production change secure to true
    // const cookieOptions: cookie.CookieSerializeOptions = {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24,
    //   path: '/'
    // };

    const cookieValue = accessResponse.refresh;

    // Simulate fetching user data, replace with actual logic based on your authentication setup
    const userConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data: userData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/`,
      userConfig
    );

    return {
      user: userData,
      access: accessToken,
      cookieValue,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        throw new Error(error.response.data.detail);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);

      throw new Error("Something went wrong");
    }
    return null;
  }
};
export default loginUser;
