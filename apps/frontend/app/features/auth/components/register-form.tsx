import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import signUp, { signUpSchema, type SignUpSchema } from "../api/sign-up";
import { isErr } from "~/lib/result";
import { toast } from "sonner";

export function RegisterForm({
  showAdminOption = false,
}: {
  showAdminOption?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      adminKey: "",
      confirmPassword: "",
      email: "",
      name: "",
      isAdmin: false,
      password: "",
    },
  });

  async function onSubmit(values: SignUpSchema) {
    setIsSubmitting(true);
    try {
      const response = await signUp(values);

      if (isErr(response)) {
        toast.error(response.error);
        return;
      }

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error("An error occurred while creating your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showAdminOption && (
          <>
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin"
                      checked={field.value}
                      onCheckedChange={(checked: boolean) =>
                        field.onChange(!!checked)
                      }
                    />
                    <FormLabel htmlFor="admin" className="text-sm font-normal">
                      Register as administrator
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {form.watch("isAdmin") && (
              <FormField
                control={form.control}
                name="adminKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        id="adminKey"
                        placeholder="Enter admin secret key"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
