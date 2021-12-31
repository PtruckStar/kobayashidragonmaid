module.exports = (d) => { return `
  <div style="display:grid; place-items:center; min-height:85vh; width:100%">
    <div style="width:100%;max-width:600px;">
      ${d.view_search}
      <h3 id="recommend">Rekomendasi <i style="color:var(--blues);">hari ini »</i>
      </h3><br>
      <div class="list-wraper"></div>
    </div>
  </div>
  ${d.js}
  <script>
    window.addEventListener("load", () => {      
      const b = document.querySelector("#nextbtn");
      b.style.display = "none";
      console.log("here")     
    });
    
    const rbtn = document.querySelector("#recommend");
    
    function getRecommends() {
      const b = document.querySelector("#nextbtn");
      b.style.display = "block";
      load();
      rbtn.removeEventListener("click", getRecommends);
    }
              
    rbtn.addEventListener("click", getRecommends);
  </script>`
}