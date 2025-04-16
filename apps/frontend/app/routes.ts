import { type RouteConfig, index } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const routes = flatRoutes();
console.log(routes);
export default routes satisfies RouteConfig;
