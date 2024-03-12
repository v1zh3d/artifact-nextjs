import { IUserLocation } from "@/interfaces/profile";
import { ABSTRACT_API_KEY, ABSTRACT_API_URL } from "@/lib/consts";
import axios from "axios";

const getUserLocation = async () => {
  const response = await axios.get<IUserLocation>(ABSTRACT_API_URL, {
    params: {
      api_key: ABSTRACT_API_KEY,
    },
  });

  if (!response) {
    return null;
  }

  return response.data;
};

export default getUserLocation;
