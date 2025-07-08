import { atom } from "recoil";

export interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export default userState;