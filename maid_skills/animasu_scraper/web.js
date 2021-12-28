const {search, play} = require("./core")
const html = require("./view/html")
const view_search = require("./view/search")
const view_error = require("./view/error")
const view_stream = require("./view/stream")

async function web_animasu(req, res) {
  const queries = req.query
  const params = req.params.jutsu
  const {s, url, src, page} = queries
  
  if(params == "search" && s != undefined) {
    const {data, response} = (page != undefined) ? await search(s, page) : await search(s)
    if(response.statusCode !== 200) return res.status(response.statusCode).send(html(view_error, "404: page not found"))
    if(data.list[0].title == "") return res.status(500).send(html(view_search + `<span class="notfound">Not Found...</span>`, `Penelusuran tidak ditemukan untuk ${s}`))
    
    let list = new Array()
    await data.list.map(t => {
      const get_url = new URL(t.url).pathname
      return list.push(`<a class="list shadow" href="${get_url}"><img src="${t.poster}"><h3 class="list-title">${t.title}</h3><span class="list-info">${t.type}, ${t.eps} ${t.status}</span></a>`)
    })
    
    const pageNumber = (data.nextpage != "") ? new URL(data.nextpage).pathname.split("/")[2] : null
    const nextpage = (data.nextpage != "") ? `/anime/search?s=${s}&page=${pageNumber}` : "none"
    const js = require("./view/search_script")(nextpage)
    
    if(page == undefined) {
      const items = list.join("")
      const wrap = `<div class="list-wraper">${items}</div>`
      return res.status(200).send(html(view_search+wrap+js, `${s} hasil penelusuran`))
    } else {
      return res.status(200).json({list, nextpage})
    }
    
  } else if(params != undefined) {
    //params become like this: /...title/
    let {data, response} = await play(params)
    if(data.title == "") {
      const next = await play(params, true)
      data = next.data
      response = next.response
      console.log("next")
    }
    if(response.statusCode !== 200) return res.status(response.statusCode).send(html(view_error, "404: page not found"))
    
    const getUrl = (link) => {
      const u = new URL(link).pathname
      return `/anime${u}`
    } 
    
    const title = data.title
    const status = data.status
    
    let video
    try {
      video = data.video[1].src
    } catch(e) {
      video = ""
    }
    
    let server = new String()
    await data.video.map(i=>{
      if(i.src == "omake") return
      server += `<option value="${i.src}">${i.res}</option>`
    })
    
    let episod = new Array()
    await data.episodes.map((i, x)=> {
      let s = (x == 0) ? `<i> ${status}</i>` : ""
      episod.push(`<div><span>${i.title + s}</span><a href="${getUrl(i.url)}">play</a></div>`)
    })
    
    let nav = new String()
    if(data.prev != "") nav += `<div class="nav"><a href="${getUrl(data.prev)}">\<\<\<</a></div>`
    if(data.next != "" && typeof data.next !== "function") nav += `<div class="nav"><a href="${getUrl(data.next)}">\>\>\></a></div>`
    
    const d = {
      title, video, server, episod, nav
    }
    const page_title = params.split("-").join(" ")
    
    return res.status(200).send(html(view_search + view_stream(d), page_title))
    
  } else {
    console.log({queries, params})
    return res.status(200).send(html(`<div style="height:90vh;width:100%;display:grid;place-items:center;">${view_search}</div>`, "Nonton anime gratis subtitle indonesia!"))
  }
}

module.exports = web_animasu