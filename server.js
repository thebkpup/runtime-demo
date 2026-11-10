const http = require("node:http");
function handler(req, res) {
  if (req.url === "/health") { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: true })); return; }
  if (req.url === "/orders") { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ orders: [] })); return; }
  res.writeHead(404, { "content-type": "text/plain" }); res.end("not found");
}
if (require.main === module) {
  http.createServer(handler).listen(3000, () => console.log("listening on 3000"));
}
module.exports = { handler };
