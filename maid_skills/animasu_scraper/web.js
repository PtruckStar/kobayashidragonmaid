const {search, play} = require("./core")
const html = require("./view/html")
const view_search = require("./view/search")
const view_error = require("./view/error")
const view_stream = require("./view/stream")
const pagination_script = require("./view/search_script")
const make_title_items = require("./view/search_items")

async function web_animasu(req, res) {
  const queries = req.query
  const params = req.params.jutsu
  const {s, page} = queries
  const handle_error = (status) => {
    if (status === 404) {
      return res.status(status).send(html(view_error, "404: page not found"))
    }
    return res.status(status).send(`error code: ${status}`)
  }
  
  if(params == "search" && s != undefined) {
    const {data, response} = (page != undefined) ? await search({search: s, page}) : await search({search: s})
    if(response.statusCode !== 200) return handle_error(response.statusCode)
    if(data.list[0].title == "") return res.status(500).send(html(view_search + `<span class="notfound">Not Found...</span>`, `Penelusuran tidak ditemukan untuk ${s}`))
    
    const list = await make_title_items(data.list)
    const pageNumber = (data.nextpage != "") ? new URL(data.nextpage).pathname.split("/")[2] : null
    const nextpage = (data.nextpage != "") ? `/anime/search?s=${s}&page=${pageNumber}` : "none"
    const js = pagination_script(nextpage)
    
    if(page == undefined) {
      const items = list.join("")
      const wrap = `<div class="list-wraper">${items}</div>`
      return res.status(200).send(html(view_search+wrap+js, `${s} hasil penelusuran`))
    } else {
      return res.status(200).json({list, nextpage})
    }
    
  } else if(params == "recommends" || params == "episode-baru") {
    const {data, response} = (params == "recommends") ? await search({recommendSearch: page}) : await search({newEpsSearch: page});
    if(response.statusCode !== 200) return handle_error(response.statusCode)
    
    const list = (data.list.length < 1) ? "" : await make_title_items(data.list)
    const nextpage = `/anime/${params}?page=${parseInt(page) + 1}`
    if(list == "") list = [], nextpage = "none";
    
    return res.status(200).json({list, nextpage})
    
  } else if(params != undefined) {
    //params become like this: /...title/
    let {data, response} = await play(params)
    if(data.title == "") {
      const next = await play(params, true)
      data = next.data
      response = next.response
      console.log("next")
    }
    if(response.statusCode !== 200) return handle_error(response.statusCode)
    
    const getUrl = (link) => {
      const u = new URL(link).pathname
      return `/anime${u}`
    } 
    
    const title = data.title
    const status = data.status
    const poster = data.poster
    
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
    
    let episod = await require("./view/episode_list")(data.episodes, status, getUrl);

    let nav = new String()
    if(data.prev != "") nav += `<div class="nav"><a href="${getUrl(data.prev)}" title="Episode Sebelumnya">\<\<\<</a></div>`
    if(data.next != "") nav += `<div class="nav"><a href="${getUrl(data.next)}" title="Episode Berikutnya">\>\>\></a></div>`
    
    const d = {
      title, video, server, episod, nav
    }
    
    return res.status(200).send(html(view_search + view_stream(d), title, poster))
    
  } else {
    console.log({queries, params})
    const {data, response} = await search({recommendSearch: 1})
    const items = (await make_title_items(data.list)).join("\n")

    const js = pagination_script("/anime/recommends?page=2")
    const main = require("./view/main_page")({view_search, js, items})
    return res.status(200).send(html(main))
  }
}

module.exports = web_animasu