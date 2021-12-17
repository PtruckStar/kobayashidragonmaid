const {search, watch, stream} = require("./main")
const view_error = require("./error")
const path = require("path")

async function web_animasu(req, res) {
  const queries = req.query
  const params = req.params.jutsu
  const {s, url, src} = queries
  
  if(params == "search" && s != undefined) {
    const {data, response} = await search(s)
    if(response.statusCode !== 200) return res.status(response.statusCode).json({status:"error", msg:response.statusMessage})
    console.log(data);
    
    return res.sendFile(path.resolve("./view/index.html"))
    
  } else {
    console.log({queries, params})
    return view_error(req, res)
  }
}

module.exports = web_animasu