import { fetchUserById } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // optional guard
  });
};
