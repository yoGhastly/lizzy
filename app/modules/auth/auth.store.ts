import { User } from "@clerk/nextjs/server";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
}
