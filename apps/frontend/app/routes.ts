import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
    route("login", "./routes/login.tsx"),
    route("products", "./routes/products/products.tsx", [
        index("./routes/products/index.tsx"),
        route("new", "./routes/products/new.tsx"),
        route(":productId/edit", "./routes/products/edit.tsx"),
    ])
] satisfies RouteConfig;
