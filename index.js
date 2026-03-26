const express = require("express");
const http = require("node:http");
const websocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({ server });

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === websocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

// Export the Express app for Vercel Serverless Functions
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, function listening() {
    console.log("Listening on %d", server.address().port);
  });
}
