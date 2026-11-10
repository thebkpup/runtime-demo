const { test } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { handler } = require("../server.js");

function call(path) {
  return new Promise((resolve) => {
    const s = http.createServer(handler).listen(0, () => {
      http.get(`http://127.0.0.1:${s.address().port}${path}`, (res) => {
        let body = "";
        res.on("data", (c) => { body += c; });
        res.on("end", () => { s.close(); resolve({ status: res.statusCode, body }); });
      });
    });
  });
}

test("health endpoint answers ok", async () => {
  const r = await call("/health");
  assert.strictEqual(r.status, 200);
  assert.strictEqual(JSON.parse(r.body).ok, true);
});

test("orders endpoint answers empty list", async () => {
  const r = await call("/orders");
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual(JSON.parse(r.body), { orders: [] });
});

test("unknown paths are 404", async () => {
  const r = await call("/nope");
  assert.strictEqual(r.status, 404);
});
