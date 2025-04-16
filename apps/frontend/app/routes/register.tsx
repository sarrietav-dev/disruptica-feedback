import isFirstAdmin from "~/features/auth/api/is-first-admin";
import { isErr } from "~/lib/result";
import { RegisterForm } from "~/features/auth/components/register-form";
import type { Route } from "./+types/register";

export async function clientLoader() {
  const firstAdmin = await isFirstAdmin();

  if (isErr(firstAdmin)) {
    throw new Response(firstAdmin.error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  return { firstUser: firstAdmin.value };
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { firstUser } = loaderData;

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            {firstUser
              ? "You're the first user! You'll automatically be registered as an admin."
              : "Enter your information to create an account"}
          </p>
        </div>
        <RegisterForm showAdminOption={firstUser} />
      </div>
    </div>
  );
}
