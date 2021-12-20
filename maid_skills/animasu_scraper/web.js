const {search, play} = require("./main")
const html = require("./view/html")
const view_search = require("./view/search")
const view_error = require("./view/error")
const view_stream = require("./view/stream")

async function web_animasu(req, res) {
  const queries = req.query
  const params = req.params.jutsu
  const {s, url, src} = queries
  
  if(params == "search" && s != undefined) {
    const {data, response} = await search(s)
    //console.log(data)
    if(response.statusCode !== 200) return res.status(response.statusCode).send(html(view_error))
    if(data.list[0].title == "") return res.status(500).send(html(view_search + `<span class="notfound">Not Found...</span>`))
    
    let list = new String()
    
    await data.list.map(t => {
      if (t.title == "") return
      
      const get_url = new URL(t.url).pathname
      return list += `<a class="list" href="${get_url}"><img src="${t.poster}"><h3 class="list-title">${t.title}</h3><span class="list-info">${t.type}, ${t.eps} ${t.status}</span></a>`
    })
    
    const wrap = `<div class="list-wraper">${list}</div>`
    return res.status(200).send(html(view_search+wrap))
    
  } else if(params != undefined) {
    //params become like this: /...title/
    let {data, response} = await play(params)
    if(data.title == "") {
      const next = await play(params, true)
      data = next.data
      response = next.response
      console.log("next")
    }
    //console.log({data, res:response.statusCode})
    if(response.statusCode !== 200) return res.status(response.statusCode).send(html(view_error))
    
    const getUrl = (link) => {
      const u = new URL(link).pathname
      return `/anime${u}`
    } 
    
    const title = data.title
    const video = data.video[1].src
    
    let server = new String()
    await data.video.map(i=>{
      if(i.src == "omake") return
      server += `<option value="${i.src}">${i.res}</option>`
    })
    
    let episod = new String()
    await data.episodes.map(i=> {
      episod += `<div><span>${i.title}</span><a href="${getUrl(i.url)}">play</a></div>`
    })
    
    let nav = new String()
    if(data.prev != "") nav += `<div class="nav"><a href="${getUrl(data.prev)}">\<\<\<</a></div>`
    if(data.next != "") nav += `<div class="nav"><a href="${getUrl(data.next)}">\>\>\></a></div>`
    
    const d = {
      title, video, server, episod, nav
    }
    
    return res.status(200).send(html(view_search + view_stream(d)))
    
  } else {
    console.log({queries, params})
    return res.status(200).send(html(`<div style="height:90vh;width:100%;display:grid;place-items:center;">${view_search}</div>`))
  }
}

module.exports = web_animasu