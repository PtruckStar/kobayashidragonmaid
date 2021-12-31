const counter = require("./counter")
const express = require("express");
const app = express();

const animasu = require("./maid_skills/animasu_scraper");

app.get("/", (req, res) => {
  res.send(`<meta http-equiv="refresh" content="0; url='/anime'" />`);
});
app.get("/anime", animasu.web);
app.get("/anime/:jutsu", counter, animasu.web);
app.get("/animasu/:jutsu", animasu.api);

app.use(function (req, res) {
  res.status(404);
  if (req.accepts("html")) {
    res.send(`<meta name="viewport" content="width=device-width, initial-scale=1.0"><div style="height:100vh;display:grid;place-items:center;font-family:sans-serif;"><span>Kek nya lu kesasar deh 🤔, yok gw antar <a href="/anime">kejalan yang benar</a></span></div>`);
    return;
  }

  if (req.accepts("json")) {
    res.json({virginity: "Not found"});
    return;
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});
