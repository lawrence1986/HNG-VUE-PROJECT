import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, users } = storeToRefs(authStore);

  return {
    user,
    users,
    login: authStore.login,
    signup: authStore.signup,
    logout: authStore.logout,
  };
};
