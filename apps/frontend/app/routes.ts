import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("login", "./routes/login.tsx"),
  route("products", "./routes/products/products.tsx", [
    index("./routes/products/index.tsx"),
    route("new", "./routes/products/new.tsx"),
    route(":productId/edit", "./routes/products/edit.tsx"),
    route(":productId", "./routes/products/show.tsx"),
  ]),
  route("feedback", "./routes/feedback/feedback.tsx", [
    index("./routes/feedback/index.tsx"),
    route("new", "./routes/feedback/new.tsx"),
  ]),
  route("admin", "./routes/admin/admin.tsx", [
    index("./routes/admin/index.tsx"),
    route("categories", "./routes/categories/categories.tsx", [
      index("./routes/categories/index.tsx"),
      route("new", "./routes/categories/new.tsx"),
      route(":categoryId/edit", "./routes/categories/edit.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
