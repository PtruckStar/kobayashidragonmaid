module.exports = (nextpage) => { return `<script>
  const parent = document.querySelector(".list-wraper").parentNode;
  const el = document.querySelector(".list-wraper");
  const btn = document.createElement("div");
  btn.style = "width: 100%; max-width: 600px; display: grid; place-items: center;"
  btn.innerHTML = '<button id="nextbtn" class="shadow" onclick="load()"> Muat lebih banyak...</button>';
  
  let nextpage = '${nextpage}', btnId
  if(nextpage != "none") {
    parent.appendChild(btn);
    btnId = document.querySelector("#nextbtn");
  }
  
  async function load() {
    btnId.innerHTML = "Memuat..."
    btnId.setAttribute("disabled", "")
    await fetch(nextpage)
    .then(x => x.json())
    .then(data => {
      if(data.list.length < 1) return btnId.parentNode.remove();
      data.list.map((i) => {
        el.insertAdjacentHTML('beforeend', i);
      });
      nextpage = data.nextpage;
      btnId.innerHTML = "Muat lebih banyak..."
      if(nextpage == "none") btnId.parentNode.remove();
      btnId.removeAttribute("disabled");
    })
    .catch(e => alert(e));
  }
</script>`}