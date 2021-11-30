import { handleRequest, withLog } from "./land/handler.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const addr = ":8080"
const handler = withLog(handleRequest);

console.log("The server is available at http://localhost:8080");
serve(handler, { addr });
