const scrapeIt = require("scrape-it");
const origin = "https://animasu.vip";

//search form
async function search(s, page, re) {
  let url = page != undefined ? origin + `/page/${page}/?s=${s}` : origin + `?s=${s}`
  if(re) url = origin + `/populer/?halaman=${re}`
  
  return await scrapeIt(url, {
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
    },
    nextpage: {
      selector: "a.next",
      attr: "href"
    }
  });
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
  });
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
  });
}

//web special api
async function play(anime, next = false) {
  if (!anime.startsWith("nonton") && !next) anime = "nonton-" + anime;
  
  if (next) {
    await scrapeIt(encodeURI(origin + "/" + anime), {
      url: {
        selector: ".bigcover > div > a",
        attr: "href",
        convert: d => {
          let u = new URL(d).pathname
          return u.replace("/", "")
        }
      }
    })
    .then(({data})=> anime = data.url)
    .catch(e=>{
      return {response:404, data:"error"}
    })
  }
  console.log(anime)

  return await scrapeIt(encodeURI(origin + "/" + anime), {
    title: "h1",
    video: {
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
    },
    episodes: {
      listItem: "ul#daftarepisode > li",
      data: {
        title: "span.lchx > a",
        url: {
          selector: "span > a",
          attr: "href"
        }
      }
    },
    status: {
      selector: ".releases",
      convert: i => {
        if(i.includes("Selesai")) return "Selesai."
        if(i.includes("Sedang Tayang")) return "Bersambung..."
      }
    },
    next: {
      selector: ".naveps :nth-child(3)",
      how: "html",
      convert: i => {
        if(i === null||/Selesai/.test(i)||/Tunggu/.test(i)) return ""
        const j = scrapeIt.scrapeHTML(i, {url: {selector: "a",attr: "href"}});
        return j.url
      }
    },
    prev: {
      selector: ".naveps :nth-child(1) > a",
      attr: "href"
    }
  });
}

module.exports = {
  search,
  watch,
  stream,
  play
};
