import { getEnvs } from "./config/envs";
import { AppRoutes, Server } from "./server";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: getEnvs().port,
        routes: AppRoutes.routes,
    });

    server.start();
}
