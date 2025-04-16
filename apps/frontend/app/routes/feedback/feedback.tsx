import { Outlet, redirect } from "react-router";
import { isAuthenticated } from "~/lib/auth";

export function clientLoader() {
  if (!isAuthenticated()) {
    throw redirect("/login");
  }
}

export default function Feedback() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
