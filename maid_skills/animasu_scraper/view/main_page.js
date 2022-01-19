module.exports = (d) => { return `
  <div style="margin-top: auto;>
    ${d.view_search}
  </div>
  <nav id="menu">
    <h3 class="recommend">Rekomendasi <i style="color:var(--blues);">hari ini »</i>
  </nav>
  </h3>
  <div class="list-wraper"></div>
   
  ${d.js}
  <script>
    window.addEventListener("load", () => {      
      const b = document.querySelector("#nextbtn");
      b.style.display = "none";
    });
    
    const rbtn = document.querySelector(".recommend");
    
    function getRecommends() {
      const b = document.querySelector("#nextbtn");
      b.style.display = "block";
      load();
      rbtn.removeEventListener("click", getRecommends);
    }
              
    rbtn.addEventListener("click", getRecommends);
  </script>`
}