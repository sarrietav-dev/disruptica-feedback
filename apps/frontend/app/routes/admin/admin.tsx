import { useAtomValue } from "jotai";
import { Outlet, redirect, useNavigate } from "react-router";
import { currentUser, isAuthenticated } from "~/lib/auth";

export function clientLoader() {
  if (!isAuthenticated) {
    throw redirect("/login");
  }
}

export default function Admin() {
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  if (user?.role !== "ADMIN") {
    navigate("/");
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
