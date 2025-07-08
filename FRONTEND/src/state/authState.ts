import { atom } from "recoil";

interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

const authState = atom<AuthState>({
  key: "authState",
  default: {
    isLoggedIn: false,
    email: "",
  },
});

export default authState;