const scrapeIt = require("scrape-it");
const express = require("express")
const app = express()

//search form
const search = async (req, res) => {
  const {s} = req.query
  scrapeIt("https://animasu.org?s=" + s, {
    list: {
      listItem: ".listupd > div",
      data: {
        title: {
          selector: "div > a",
          attr: "title"
        },
        eps: ".epx",
        status: ".sb",
        type: ".typez",
        poster: {
          selector: "div > div img",
          attr: "src"
        },
        url: {
          selector: "div > a",
          attr: "href"
        }
      }
    }
  }).then(({data, response}) => {
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    //console.log(response);
    res.status(200).json(data)
  });
};

//get episodes
const watch = async (req, res) => {
  const {url} = req.query
  scrapeIt(url, {
    list: {
      listItem: "ul#daftarepisode > li",
      data: {
        title: "span.lchx > a",
        url: {
          selector: "span > a",
          attr: "href"
        }
      }
    }
  }).then(({data, response}) => {
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    //console.log(response);
    res.status(200).json(data)
  });
};

//get stream url
const loadStream = async (req, res) => {
  const {src} = req.query
  scrapeIt(src, {
    url: {
      selector: "#pembed > iframe",
      attr: "src"
    }
  }).then(({data, response}) => {
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    //console.log(response);
    res.status(200).json(data)
  });
};

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
  res.send(`<div style="height:100vh;display:grid;place-items:center;"><span>hello motherfucker 😎 🤟🏼</span></div>`)
})
app.get("/search", search)
app.get("/watch", watch)
app.get("/stream", loadStream)
app.listen(PORT, () => console.log("ready"))
