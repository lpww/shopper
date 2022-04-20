"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("health is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/health",
  });
  t.equal(res.payload, '{"message":"ok"}');
});
