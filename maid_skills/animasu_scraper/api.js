const {search, watch, stream} = require("./main")
const view_error = require("./view/error")
const html = require("./view/html")

async function api_animasu(req, res) {
  const queries = req.query
  const params = req.params.jutsu
  const {s, url, src} = queries || undefined
  
  if(params == "search" && s != undefined) {
    const {data, response} = await search(s)
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    console.log(data);
    return res.status(200).json(data)
    
  } else if(params == "watch" && url != undefined) {
    const {data, response} = await watch(url)
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    console.log(data);
    return res.status(200).json(data)
    
  } else if(params == "stream" && src != undefined) {
    const {data, response} = await stream(src)
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    console.log(data);
    return res.status(200).json(data)
    
  } else {
    console.log({queries, params})
    return res.status(404).send(html(view_error))
  }
}

module.exports = api_animasu