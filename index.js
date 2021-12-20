const express = require("express");
const app = express();

const animasu = require("./maid_skills/animasu_scraper");

app.get("/", (req, res) => {
  res.send(`<div style="height:100vh;display:grid;place-items:center;"><span>hello motherfucker 😎 🤟🏼</span></div>`);
});
app.get("/anime", animasu.web)
app.get("/anime/:jutsu", animasu.web);
app.get("/animasu/:jutsu", animasu.api)

app.use(function (req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.send(`<div style="height:100vh;display:grid;place-items:center;"><span>Fuck you! what are you looking here?! get out!</span></div>`);
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({virginity: "Not found"});
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("wait a minute!, WHO ARE YOU?!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`)
});
