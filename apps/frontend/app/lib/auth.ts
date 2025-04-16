import { ACCESS_TOKEN } from "~/features/auth/types/access-token";
import { atom } from "jotai";
import type { User } from "~/features/users/types/user";

export function isAuthenticated(): boolean {
  return !!sessionStorage.getItem(ACCESS_TOKEN);
}

export function saveToken(token: string): void {
  sessionStorage.setItem(ACCESS_TOKEN, token);
}

export const currentUser = atom<(User & { role: "USER" | "ADMIN" }) | null>();
