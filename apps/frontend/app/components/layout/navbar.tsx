import { useAtomValue } from "jotai";
import { Link, useLocation } from "react-router";
import { currentUser } from "~/lib/auth";
import { cn } from "~/lib/utils";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Feedback", href: "/feedback" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const user = useAtomValue(currentUser);

  return (
    <div className="mr-4 flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">Product Feedback System</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname.startsWith(item.href)
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            {item.name}
          </Link>
        ))}
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname.startsWith("/admin")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Admin
          </Link>
        )}
      </nav>
    </div>
  );
}
