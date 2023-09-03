import axios from 'axios';

interface RegisterResponse {
  success: boolean;
  message?: string;
  username?: string;
  password?: string;
}

const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const body = {
    username,
    email,
    password
  };

  try {
    // Call the registration API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/`,
      body,
      config
    );

    if (response.status === 201) {
      return { success: true, username, password };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { success: false, message: error.response.data.username[0] };
      } else if (error.request) {
        return { success: false, message: 'Something went wrong' };
      } else {
        return { success: false, message: 'Something went wrong' };
      }
    }
  }

  return { success: false, message: 'Something went wrong' };
};

export default registerUser;
