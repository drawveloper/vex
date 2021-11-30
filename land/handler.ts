/* Forked from Deno Land. All rights reserved. MIT license. */

import { handleRegistryRequest } from "./registry.ts";
import { ConnInfo } from "https://deno.land/std@0.114.0/http/server.ts";

export function withLog(
  handler: (
    request: Request,
    connInfo: ConnInfo,
  ) => Response | Promise<Response>,
): (request: Request, connInfo: ConnInfo) => Promise<Response> {
  return async (req, con) => {
    let err: unknown;
    let res!: Response;
    try {
      res = await handler(req, con);
    } catch (e) {
      err = e;
      console.error(err);
      res = new Response(
        "500 Internal Server Error\nPlease try again later.",
        { status: 500 },
      );
    } finally {
      return res;
    }
  };
}

export function handleRequest(request: Request) {
  const accept = request.headers.get("accept");
  const isHtml = accept && accept.indexOf("html") >= 0;

  const url = new URL(request.url);

  if (url.pathname.startsWith("/typedoc")) {
    return Response.redirect("https://doc.deno.land/builtin/stable", 301);
  }

  const isRegistryRequest = url.pathname.startsWith("/std") ||
    url.pathname.startsWith("/x/");

  if (isHtml) {
    console.log('HTML was requested but is not currently implemented. Sending raw file from github.')
  }

  if (isRegistryRequest) {
    return handleRegistryRequest(url);
  }

  return new Response("Hello, vex.");
}