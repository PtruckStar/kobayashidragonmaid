module.exports = (nextpage) => { return `<script>
  const parent = document.querySelector("#content");
  const el = document.querySelector(".list-wraper");
  const btn = document.createElement("div");
  btn.innerHTML = '<button id="nextbtn" class="shadow" onclick="load()"> Muat lebih banyak...</button>';
  
  let nextpage = '${nextpage}', btnId
  if(nextpage != "none") {
    parent.appendChild(btn);
    btnId = document.querySelector("#nextbtn");
  }
  
  async function load() {
    btnId.innerHTML = "Memuat..."
    await fetch(nextpage)
    .then(x => x.json())
    .then(data => {
      data.list.map((i) => {
        el.insertAdjacentHTML('beforeend', i);
      });
      nextpage = data.nextpage;
      btnId.innerHTML = "Muat lebih banyak..."
      if(nextpage == "none") btnId.parentNode.remove();
    })
    .catch(e => alert(e));
  }
</script>`}