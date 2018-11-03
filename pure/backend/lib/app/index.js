const loader = require("./loader");
const app = new loader();

let port = app.config.port;

app.listen(port, "127.0.0.1", () => {
  console.log("Server listening at: " + port);
});
