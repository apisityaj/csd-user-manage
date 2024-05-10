import axios from "axios";
import { LoginResponse } from "@/app/_type/auth_type";

const loginAPI = async (username: string, password: string): Promise<any> => {
  try {
    const data = JSON.stringify({
      username: username,
      password: password,
    });
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/public/sso/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response?.status === 200) {
      const accessToken = response?.data?.result[0]?.accessToken;
      const role = response?.data?.result[0]?.id;

      localStorage.setItem("accessToken", accessToken || "");
      localStorage.setItem("role", role || "");

      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/search/role?id=${role}`
      );
      if (userResponse?.status === 200) {
        return userResponse;
      } else {
        return userResponse;
      }
    }

    return null;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

const apiAuth = {
  loginAPI,
};

export default apiAuth;
