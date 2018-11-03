const child_process = require("child_process");

const server = child_process.spawn("pure/backend/bin/start", []);

server.on("exit", function(code) {
  if (!curlRunning) {
    return process.exit(code);
  }
});

let curlRunning = false;

const runCurl = function() {
  curlRunning = true;
  const curl = child_process.spawn("curl", ["-v", "http://127.0.0.1:3000/"]);
  curl.on("exit", function(code) {
    if (code === 0) {
      console.log("\nTest passed\n");
      return process.exit(0);
    } else {
      console.error("\nTest failed\n");
      return process.exit(code);
    }
  });

  curl.stdout.on("data", data => process.stdout.write(data));

  return curl.stderr.on("data", data => process.stderr.write(data));
};

server.stderr.on("data", data => process.stderr.write(data));

server.stdout.on("data", function(data) {
  process.stdout.write(data);
  if (data.toString().indexOf("listening at") >= 0) {
    if (!curlRunning) {
      return runCurl();
    }
  }
});

process.on("exit", code => {
  server.kill();
});
