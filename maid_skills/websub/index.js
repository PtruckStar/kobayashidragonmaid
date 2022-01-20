const fs = require("fs");
const Downloader = require("nodejs-file-downloader");
const Ziper = require("adm-zip");
const convert = require("./converter");

const work_path = __dirname + "/temp/";

async function main(req, res) {
  const {url} = req.query;
  const handleError = error => {
    console.log(error);
    return res.status(500).json({ok: false, msg: error.message});
  };
  
  if(url === undefined || url === null) return handleError(Error("no url"))
  await init(function(e) {
    if(e) return handleError(e)
  });
  
  const downloader = new Downloader({
    url,
    directory: work_path, //Sub directories will also be automatically created if they do not exist.
    maxAttempts: 3,
    fileName: "sub.zip",
    cloneFiles: false,
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
    }
  });

  try {
    await downloader.download();
    const zip = new Ziper(work_path + "sub.zip");
    await zip.extractAllTo(work_path);
    const files = await fs.readdirSync(work_path).filter(file => {
      return /srt/.test(file);
    });
    const srt = await fs.readFileSync(work_path + files[0], "utf8");
    const vtt = await convert(srt);
    await fs.writeFileSync(work_path + "sub.vtt", vtt, "utf8");
    return res.status(200).download(work_path + "sub.vtt");
  } catch (error) {
    return handleError(error);
  }
}

async function recentAddSub(req, res) {
  const sub = work_path + "sub.vtt";
  fs.access(sub, fs.constants.F_OK, err => {
    if (err) res.status(404).json({ok: false, msg: "gak ada file subtitle cok"});
    res.status(200).download(sub);
  });
}

async function init(cb) {
  try {
    if (!fs.existsSync(work_path)) fs.mkdirSync(work_path);
    //clear prev temporary file
    fs.readdir(work_path, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(work_path + file, err => {
          if (err) throw err;
        });
      }
    });
  } catch (e) {
    return cb(e);
  }
}

module.exports = main;
module.exports.recent = recentAddSub;
