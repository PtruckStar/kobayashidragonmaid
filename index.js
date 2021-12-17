const express = require("express");
const app = express();

const animasu = require("./maid_skills/animasu_scraper");

app.get("/", (req, res) => {
  res.send(`<div style="height:100vh;display:grid;place-items:center;"><span>hello motherfucker 😎 🤟🏼</span></div>`);
});
app.get("/animasu/:jutsu", animasu);

app.use(function (req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.send(`<div style="height:100vh;display:grid;place-items:center;"><span>Fuck you! what are you looking here?! get out!</span></div>`);
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({error: "Not found"});
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`)
  //safari.open(url+"/animasu/stream?src=https://animasu.org/nonton-kobayashi-san-chi-no-maid-dragon-s-episode-10/")
  //safari.open(url + "/animasu/search?s=naruto");
});
