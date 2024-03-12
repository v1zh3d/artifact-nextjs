import { ARTIFACT_API_URL, userDetailsStub } from "@/lib/consts";
import axiosInstance from ".";
import { IUserDetails } from "@/interfaces/profile";
import { AxiosError } from "axios";

const getUserProfile = async () => {
  const response = await axiosInstance.get<IUserDetails>(
    `${ARTIFACT_API_URL}/users/me`
  );

  if (response instanceof AxiosError) {
    return userDetailsStub; // Can return null. But i am explicitly keep it for default values.
  }

  return response.data;
};

export default getUserProfile;
