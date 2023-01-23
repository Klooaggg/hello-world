const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var exec = require("child_process").exec;
const os = require("os");
const { createProxyMiddleware } = require("http-proxy-middleware");
var request = require("request");
var fs = require("fs");

app.get("/", (req, res) => {
  res.send("404 not found");
});


app.get("/status", (req, res) => {
  let cmdStr = "ps -ef";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("err：\n" + err + "</pre>");
    } else {
      res.type("html").send("<pre>err：\n" + stdout + "</pre>");
    }
  });
});


app.get("/start", (req, res) => {
  let cmdStr = "chmod +x ./nginx && ./nginx -c ./config.yaml >/dev/null 2>&1 &";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("404 not found");
    } else {
      res.send("404 not found");
    }
  });
});


app.get("/info", (req, res) => {
  let cmdStr = "cat /etc/*release | grep -E ^NAME";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("err：" + err);
    } else {
      res.send(
        "err：\n" +
          "Linux System:" +
          stdout +
          "\nRAM:" +
          os.totalmem() / 1000 / 1000 +
          "MB"
      );
    }
  });
});


app.get("/test", (req, res) => {
  fs.writeFile("./test.txt", "err", function (err) {
    if (err) res.send("err" + err);
    else res.send("err");
  });
});

app.use(
  "/a-p-i-2-0-2-3",
  createProxyMiddleware({
    target: "http://127.0.0.1:8080/", 
    changeOrigin: true, 
    ws: true, 
    pathRewrite: {

      "^/a-p-i-2-0-2-3": "/qwe",
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {},
  })
);

/* keepalive  begin */
/*
function keepalive() {

  let render_app_url = "https://amacway.adaptable.app";
  request(render_app_url, function (error, response, body) {
    if (!error) {
      console.log("err！");
      console.log("err:", body);
    } else console.log("err: " + error);
  });


  request(render_app_url + "/status", function (error, response, body) {
    if (!error) {
      if (body.indexOf("./nginx -c ./config.yaml") != -1) {
        console.log("err");
      } else {
        console.log("err");
        request(render_app_url + "/start", function (err, resp, body) {
          if (!err) console.log("err:" + body);
          else console.log("err:" + err);
        });
      }
    } else console.log("err: " + error);
  });
}
setInterval(keepalive, 9 * 1000);
*/
/* keepalive  end */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
