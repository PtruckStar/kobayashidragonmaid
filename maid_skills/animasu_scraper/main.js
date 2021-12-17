const scrapeIt = require("scrape-it");

//search form
async function search(s) {
  return await scrapeIt("https://animasu.vip?s=" + s, {
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
  })
}

//get episodes
async function watch(url) {
  return await scrapeIt(encodeURI(url), {
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
  })
}

//get stream url
async function stream(src) {
  return await scrapeIt(encodeURI(src), {
    default: {
      selector: "#pembed > iframe",
      attr: "src"
    },
    options: {
      listItem: ".video-nav > div > select > option",
      data: {
        res: {
          how: "html"
        },
        src: {
          attr: "value",
          convert: data => {
            if (data == "") return "omake";
            let encode = Buffer.from(data, "base64").toString("ascii");
            let s = scrapeIt.scrapeHTML(encode, {
              url: {
                selector: "iframe",
                attr: "src"
              }
            });
            return s.url;
          }
        }
      }
    }
  })
}

module.exports = {
  search, watch, stream
}
