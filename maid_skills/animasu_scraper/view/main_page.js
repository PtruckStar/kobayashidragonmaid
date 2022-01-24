module.exports = (d) => { return `
  ${d.view_search}
  <nav id="menu">
    <button id="recBtn" onclick="toggleTab('rec')" active="">Rekomendasi</button>
    <button id="newBtn" onclick="toggleTab('new')">Episode Terbaru</button>
  </nav>
  
  <div id="rec" class="list-wraper" style="display:grid;">
    ${d.items}
  </div>

  <div id="new" class="list-wraper" style="display:none;"></div>
   
  ${d.js}
  <script>
    const rec_el = document.querySelector("#rec")
    const new_el = document.querySelector("#new")
    const recBtn = document.querySelector("#recBtn")
    const newBtn = document.querySelector("#newBtn")

    let saved_next_recommend_page_url = nextpage
    let saved_next_newEps_page_url = "/anime/episode-baru?page=1"
    let saved_list_wraper_element = list_wraper_element

    list_wraper_element = document.querySelector("#rec.list-wraper");

    function toggleUrl(tab) {
      let temp
      if (tab == "rec") {
        temp = nextpage
        nextpage = saved_next_recommend_page_url
        saved_next_newEps_page_url = temp
        saved_list_wraper_element = list_wraper_element
        list_wraper_element = document.querySelector("#rec.list-wraper");
      } else {
        temp = nextpage
        nextpage = saved_next_newEps_page_url
        saved_next_recommend_page_url = temp
        saved_list_wraper_element = list_wraper_element
        list_wraper_element = document.querySelector("#new.list-wraper");
      }
    }

    function toggleTab(tab) {
      if(tab === "rec") {
        rec_el.style.display = "grid"
        new_el.style.display = "none"
        recBtn.setAttribute("active", "")
        newBtn.removeAttribute("active")
        toggleUrl(tab)
      } else {
        rec_el.style.display = "none"
        new_el.style.display = "grid"
        newBtn.setAttribute("active", "")
        recBtn.removeAttribute("active")
        toggleUrl(tab)
      }
    }
    
    newBtn.addEventListener("click", function() {
      load();
    }, {once : true});
  </script>`
}