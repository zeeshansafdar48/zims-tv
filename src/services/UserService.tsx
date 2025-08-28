import API from "@/interceptors/axios";
import { User } from "@/types/generalTypes";

export const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await API.get<User>(`/users/${id}`);
  return data;
};
