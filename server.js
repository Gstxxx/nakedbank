import { Hono } from "hono";
import { cors } from 'hono/cors'
import { serve } from "@hono/node-server";
const mainApp = new Hono();

mainApp.use('/*', cors())
// Mount auth and quotes sub-apps to the main app
// const routes = mainApp
//     .route("/", authApp)    // Handle auth-related routes
//     .route("/", quotesApp); // Handle quotes-related routes


// export type AppType = typeof routes;
const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
    fetch: mainApp.fetch,
    port,
});