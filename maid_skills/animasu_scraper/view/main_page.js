module.exports = (d) => { return `
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@splidejs/splide@3.6.11/dist/js/splide.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@3.6.11/dist/css/splide.min.css">
  <style>
    .splide {
      width: 100%;
      max-width: 600px;
      margin-top: 1rem;
      border-radius: 0.5rem;
    }
    .splide__slide {
      background: pink;
      height: 200px;
      border-radius: .5rem;
      overflow: hidden;
      position: relative;
    }
    .sd_item_wrapper {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 100%;
      height: 100%;
      background-color: var(--blur);
      padding:0 .5rem;
    }
    .sd_item_wrapper img {
      height: 190px;
      border-radius: .5rem;
    }
    .sd_item_info {
      width: 200px;
      height: 100%;
      padding-top: 2rem;
      padding-right: 1rem;
    }
    .sd_item_bg {
      width: 100%;
      height:100%;
      position: absolute;
      z-index: 0;
    }
  </style>
  <div class="splide shadow">
    <div class="splide__track">
      <ul class="splide__list">
        ${d.hero.join("\n")}
        <li class="splide__slide">
        <div class="sd_item_bg" style="background: url('https://cdn.myanimelist.net/images/anime/1943/117882.jpg') no-repeat top center; background-size: cover; filter: blur(15px)"></div>
        <div style="width: 100%; height: 100%; display: grid; place-items: center; background: var(--blur); position: absolute;">
          <a href="">
            <div style="background-color: var(--blues); color: white; padding: 1rem; border-radius: 0.5rem;">Rekomendasi lainnya..</div>
          </a>
        </div>
      </ul>
    </div>
  </div>
  ${d.view_search}
  <nav id="menu">
    <h3 class="recommend">Rekomendasi <i style="color:var(--blues);">hari ini »</i>
  </nav>
  </h3>
  <div class="list-wraper"></div>
   
  ${(d.js)?d.js:""}
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
  </script>
  <script>
    window.onload = () => {
      new Splide( '.splide', {
        type: 'fade',
        rewind: true,
        autoplay: true,
        interval: 2000,
        pagination: false
      }).mount()
    }
  </script>`
}