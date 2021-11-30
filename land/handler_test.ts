/* Copyright 2021 the Deno authors. All rights reserved. MIT license. */

import { assert } from "./test_deps.ts";
import { handleRequest } from "./handler.ts";

Deno.test({
  name: "/std@v0.50.0/version.ts with no Accept responds with raw typescript",
  async fn() {
    const result = await handleRequest(
      new Request("https://deno.land/std@0.50.0/version.ts"),
    );
    assert(result.headers.get("Content-Type")?.includes(
      "application/typescript",
    ));
    const text = await result.text();
    assert(text.includes("/** Version of the Deno standard modules"));
  },
});

