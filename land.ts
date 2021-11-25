import { handleRequest, withLog } from "./land/handler.ts";
import { listenAndServe } from "https://deno.land/std@0.108.0/http/server.ts";

const handler = withLog(handleRequest);

console.log("The server is available at http://localhost:8080");
listenAndServe(":8080", handler);
