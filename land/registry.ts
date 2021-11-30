/* Forked from Deno Land. All rights reserved. MIT license. */

import { parseNameVersion } from "./registry_utils.ts";

export const GITHUB_RAW =
  "https://raw.githubusercontent.com/vtex-apps/";

export async function handleRegistryRequest(url: URL): Promise<Response> {
  const entry = parsePathname(url.pathname);
  if (!entry) {
    return new Response("This module entry is invalid: " + url.pathname, {
      status: 400,
      headers: { "content-type": "text/plain" },
    });
  }
  const { module, version, path } = entry;
  if (!version) {
    return new Response(
      "Please specify a version: " + url.pathname,
      {
        status: 404,
        headers: { "content-type": "text/plain" },
      },
    );
  }
  
  const remoteUrl = getBackingURL(module, version, path);
  const resp2 = await fetchSource(remoteUrl);

  // JSX and TSX content type fix
  if (
    remoteUrl.endsWith(".jsx") &&
    !resp2.headers.get("content-type")?.includes("javascript")
  ) {
    resp2.headers.set("content-type", "application/javascript");
  } else if (
    remoteUrl.endsWith(".tsx") &&
    !resp2.headers.get("content-type")?.includes("typescript")
  ) {
    resp2.headers.set("content-type", "application/typescript");
  }

  resp2.headers.set("Access-Control-Allow-Origin", "*");
  return resp2;
}

export function parsePathname(
  pathname: string,
): { module: string; version: string | undefined; path: string } | undefined {
  if (pathname.startsWith("/std")) {
    return parsePathname("/x" + pathname);
  }
  if (!pathname.startsWith("/x/")) {
    return undefined;
  }
  pathname = decodeURIComponent(pathname);
  const nameBranchRest = pathname.replace(/^\/x\//, "");
  const [nameBranch, ...rest] = nameBranchRest.split("/");
  const [name, version] = parseNameVersion(nameBranch);
  const path = rest.join("/");
  return { module: name, version, path };
}

export function getBackingURL(app: string, version: string, path: string) {
  return `${GITHUB_RAW}${app}/${version}/${path}`;
}

export async function fetchSource(remoteUrl: string) {
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      const resp = await fetch(remoteUrl);
      if (resp.status === 403 || resp.status === 404) {
        return new Response("404 Not Found", { status: 404 });
      }
      if (!resp.ok) throw new TypeError("non 2xx status code returned");
      return new Response(resp.body, {
        headers: resp.headers,
        status: resp.status,
      });
    } catch (err) {
      // TODO(lucacasonato): only retry on known retryable errors
      console.warn("retrying on proxy error", err);
      lastErr = err;
    }
  }
  throw lastErr;
}
