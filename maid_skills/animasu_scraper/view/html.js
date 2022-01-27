const h = (content, title, poster) => {
  if(title && !title.includes("hasil penelusuran") && !title.includes("nonton")) title = "Nonton " + title
  //bc making regExp pattern is dificult hehe
  const ogTitle = (i) => {
    if(i.startsWith("Nonton")) i = i.replace("Nonton ", "")
    if(i.includes("Season")) i = i.substring(0, i.indexOf("Season") - 1)
    if(/Episode\s\d/.test(i)) i = i.substring(0, i.indexOf("Episode") - 1)
    if(i.includes("Sub Indo")) i = i.replace(" Sub Indo", "")
    return i
  }
  
  const ogDes = (i) => {
    if(i.includes("Season")){
      i = i.substring(i.indexOf("Season"), i.length)
      i = i.replace(" Sub Indo", "")
    } else if(/Episode\s\d/.test(i)) {
      i = i.substring(i.indexOf("Episode"), i.length)
      i = i.replace(" Sub Indo", "")
    } else if(i.includes("Movie")) {
      i = "Movie"
    } else {
      i = "Special Episode"
    }
    return i
  }
  
  return `
  <!DOCTYPE html>
  <html color-mode="light">
  <head>
  <title>${(title)? title : "Nonton anime gratis subtitle indonesia!"}</title>
  ${(title)? `<meta property="og:title" content="${ogTitle(title)}">` : ""}
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="og:description" content="${(title)? ogDes(title) + " Subtitle Indonesia" : "Nonton anime gratis, Tanpa iklan, Subtitle indonesia, Semuan seri lengkap! update tiap hari!!"}">
  ${(poster)? `<meta property="og:image" content="${poster}">` : ""}
  <meta property="og:url" content="https://kobayashidragonmaid.herokuapp.com/anime/">
  <meta property="og:type" content="video.tv_show" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    if (
        localStorage.getItem('color-mode') === 'dark' ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches &&
         !localStorage.getItem('color-mode'))
    ) {
        document.documentElement.setAttribute('color-mode', 'dark')
    }
  </script>
  <style>
    :root[color-mode="dark"] {
      --background: #1D1D1D;
      --foreground: #0C0C0C;
      --lighten: #060606;
      --blues: #3559a2;
      --shadow: #151515;
      --text: #d1d1d1;
      --subtext: gray;
      --dismiss: #c62a5e;
      --blur: rgba(12, 12, 12, 0.5);
    }
    :root[color-mode="light"] {
      --background: #f1f1f1;
      --foreground: #fff;
      --lighten: #D0D0D0;
      --blues: #3478F6;
      --shadow: #E4E4E4;
      --text: black;
      --subtext: #444;
      --dismiss: #ed0a5a;
      --blur: rgba(255, 255, 255, 0.5);
    }
    :root[color-mode="light"] .light--hidden {
        display: none;
    }
    :root[color-mode="dark"] .dark--hidden {
        display: none;
    }
    
    * {
      transition-property: color, background, ovacity, box-shadow;
      transition-duration: 0.5s;
      transition-timing-function: ease-in;
      padding: 0;
      margin: 0;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      background-color: var(--background);
      font-family: sans-serif;
      padding: 0 0.5rem;
    }
    a {
      text-decoration: none;
    }

    header {
      position: relative;
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      height: 190px;
    }
    .hero {
      max-width: 600px;
      position: absolute;
      z-index: -2;
    }
    
    #content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 100vh;
      gap: 1rem;
    }
    .list-wraper {
      max-width: 600px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      justify-content: stretch;
    }
    a.list {
      text-decoration: none;
      font-family: sans-serif;
      overflow: hidden;
      padding-bottom: 0.5rem;
      background-color: var(--foreground);
      border-radius: 0.5rem;
      display: block;
      animation: jenjen 1s linear;
    }
    a.list > img {
      width: 100%;
      margin-bottom: 0.5rem;
      transition: 0.2s linear;
    }
    .list_info {
      padding: 0 .5rem;
      transition: 0.2s linear;
    }
    .list_info h3 {
      color: var(--text);
    }
    .list_info span {
      font-size: 0.75rem;
      color: var(--subtext);
    }
    
    .search_wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      max-width: 600px;
      gap: 0.5rem;
    }
    form {
      width: 100%;
      background-color: var(--foreground);
      border-radius: 0.5rem;
      padding: 0;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input:focus {
      border: none;
      outline: none;
    }
    input[type="text"] {
      width: 100%;
      border: none;
      height: 2rem;
      font-size: 1em;
      margin-left: 0.5rem;
      background: transparent;
      color: var(--subtext);
    }
    input[type="submit"] {
      background-color: var(--blues);
      color: white;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 0;
      border: none;
      float: right;
      height: 2rem;
      margin: 0;
      padding: 0 0.5rem;
      font-size: 1em;
      cursor: pointer;
    }
      
    .stream_info {
      background-color: var(--foreground);
      border-radius: 0.5rem;
      overflow: hidden;
      padding: 1rem;
      max-width: 600px;
      box-sizing: border-box;
    }
    .stream_info .info_wrapper p {
      color: var(--subtext);
    }
    .info_wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .stream_container {
      width: 100%;
      aspect-ratio: 16 / 9;
      max-width: 600px;
      border-radius: 0.5rem;
      position: relative;
      display: grid;
      place-items: center;
    }
    .loader {
      position: absolute;
      z-index: -1;
      font-size: 1.5rem;
      color: var(--lighten);
      font-weight: bold;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0.5rem;
      margin:0;
      padding:0;
      max-width: 600px;
    }
    h3 {
      margin:0;
      padding:0;
      color: var(--text)
    }
    
    .eps_list_wraper {
      padding:0;
      margin:0;
      border-radius: .5rem;
      overflow: hidden;
    }
    ul.eps_list {
      list-style: none;
      width: 100%;
      height: 15rem;
      overflow-y: scroll;
      padding: 0;
    }
    ul.eps_list > li {
      line-height: 2;
      height: 2rem;
      padding: 0.5rem;
      border-bottom: dashed 1px var(--subtext);
      display: block;
      color: var(--subtext);
    }
    ul.eps_list > li::after {
      content: "";
      clear: both;
      display: table;
    }
    ul.eps_list > li:nth-of-type(odd) {
      background-color: var(--background);
    }
    ul.eps_list > li > a {
      float: right;
      color: var(--blues);
      display: flex;
      align-items: center;
    }
    ul.eps_list > li > span > i {
      color: var(--blues);
    }
    .play_svg {
      width: 1.5rem;
      padding: 0 0.5rem;
    }
      
    .navbar {
      display: flex;
      justify-content: center;
      gap: 1em;
      height: 2.5rem;
      background-color: var(--foreground);
      border-radius: 0.5rem;
      overflow: hidden;
      width: 100%;
      max-width: 600px;
    }
    .nav {
      flex-grow: 1;
      font-size: 2rem;
      text-align: center;
    }
    .nav > a {
      color: var(--blues);
    }
    
    .notfound {
      font-size: 3rem;
      color: var(--lighten);
      text-align: center;
      vertical-align: middle;
      margin-top:3rem
    }
      
    footer {
      text-align: center;
      color: var(--lighten);
      font-weight: bolder;
      padding: 2rem;
      margin-top: auto;
    }
    .social_items {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: lighter;
      width: 100%;
      color: var(--lighten)
    }
    .social_items svg {
      fill: var(--lighten);
      padding: 0 0.5rem;
    }
    
    .nav_wraper {
      width: 100%;
      position: relative;
      padding: 0;
    } 
    .nextbtn_wraper {
      width: 100%;
      position: absolute;
      display: grid;
      place-items: center;
    }
    .topbtn_wraper {
      width: 100%;
      position: absolute;
      right: 0;
      display: none;
    }
    .topbtn_mid_wraper {
      width: 100%;
      display: grid;
      place-items: center;
    }
    .topbtn_inner_wraper {
      width: 100%;
      max-width: 600px;           
    }
    .make_it_fly {
      position: fixed;
      right: 0;
      bottom: 2rem;
      margin: 0 0.5rem;
    }
    #topbtn {
      background-color: var(--dismiss);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      margin-right: 2rem;
      font-size: 1em !important;
      z-index: 99;
      float: right;
      cursor: pointer;
    }
    #nextbtn {
      background-color: var(--blues);
      color: white;
      font-size: 1em;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      z-index: 99;
      cursor: pointer;
    }
    #nextbtn[disabled] {
      background-color: grey;
    }
    .ghost {
      font-size: 1em;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      background-color: grey;
      visibility: hidden;
    }
    
    #menu{
      width: 100%;
      max-width: 600px;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      height: 1.25rem;
    }
    #recBtn, #newBtn {
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      background-color: var(--foreground);
      color: var(--text);
      font-weight: bolder;
      transition: .2s;
    }
    #recBtn:hover, #newBtn:hover {
      color: var(--blues);
      cursor: pointer;
      transform: scale(1.2, 1.2);
      margin: 0 .5rem;
    }
    #recBtn[active], #newBtn[active] {
      color: var(--blues);
    }
    
    .color-mode__btn {
      border: solid 1px var(--blues);
      border-radius: 0.5rem;
      background-color: var(--foreground);
      height: 2rem;
      /*box-shadow: 
        -2px -2px 5px -3px var(--blues),
        2px 2px 5px -3px var(--blues);*/
    }
    .toggle_svg {
      width: 1.5rem;
      padding: 0 0.5rem;
      color: var(--blues);
    }
    
    .toast_wraper {
      position: fixed;
      width: 100%;
      display: none;
      place-items: center;
      margin-top: 1rem;
      top: 0;
      z-index: 99;
    }
    .toast {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 300px;
      max-width: 700px;
      background-color: var(--foreground);
      padding: 1rem;
      border-radius: 0.5rem;
      border-bottom: solid 2px var(--blues);
      animation: ajepajep 2s linear infinite;
    }
    .toast_close_btn {
      background: var(--dismiss);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      margin-left: 2rem;
      cursor: pointer;
    }
    .toast a {
      display: flex;
      align-items: center;
      color: var(--text)
    }
    .toast i {
      color: var(--blues);
    }
    .toast_wraper:hover div {
      transform: scale(1.1,1.1) !important;
      animation-play-state: paused !important;
      box-shadow: 
        -5px -5px 5px -3px var(--shadow),
        5px 5px 5px -3px var(--shadow);
    }
    .toast a:hover {
      text-decoration: underline;
      text-decoration-style: wavy;
    }
    .toast button:hover {
      transform: scale(0.9, 0.9)
    }
    .ig_svg {
      fill: var(--blues);
      margin-right: 0.5rem;
    }
    
    .shadow {
      box-shadow: 
        -5px -5px 5px -3px var(--shadow),
        5px 5px 5px -3px var(--shadow);
    }
    
    @keyframes jenjen {
      0% { opacity: 0; }
      100% {opacity: 1; }
    }

    @keyframes ajepajep {
      9% {
        transform: translateY(0);
      }
      16.65% {
        transform: translateY(8px);
      }
      23.3% {
        transform: translateY(-6px);
      }
      29.95% {
        transform: translateY(4px);
      }
      36.6% {
        transform: translateY(-2px);
      }
      43.25% {
        transform: translateY(1px);
      }
      49.95% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @media(min-width:48em) {
      .list-wraper {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      .list:hover img{
        transform: scale(1.1, 1.1);
      }
      .list:hover .list_info {
        transform: translateY(-50%);
        background: var(--blur);
      }
      .list_info span {
        font-size: 0.7rem;
      }
      .make_it_fly {
        margin: 0;
      }
    }
  </style>
  </head>
  <body>
  
  <section class="toast_wraper">
    <div class="toast">
      <a href="https://instagram.com/touru_anime" target="_blank" rel="noopener noreferrer" title="klik ke instagram @touru_anime" onclick="close_toast()">
        <svg class="ig_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span>Follow IG kami <i>@touru_anime</i></span>
      </a>
      <button class="toast_close_btn" onclick="close_toast()">Tutup</button>
    </div>
  </section>
  
  <header>
    <a href="/anime" title="Beranda" style="width:600px;height:100%;"></a>
    <img src="/heroS.png" class="hero" alt="Nonton Anime Gratis Tanpa Iklan Hannya disini!">
  </header>
  
  <main id="content">
    ${content}
   
    <footer>
      <span">rahayu.</span><br>
      <section class="social_items">
        <a class="social_items" href="https://instagram.com/touru_anime" target="_blank" rel="noopener noreferrer" title="klik ke instagram @touru_anime">
          <svg style="fill:var(--lighten)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z"/>
          </svg>
          <span>@touru_anime</span>
        </a>
      </section>
    </footer>
  </main>
  
  <script>
  const toggleColorMode = e => {
    if (e.currentTarget.classList.contains("light--hidden")) {
      	document.documentElement.setAttribute("color-mode", "light");
  		localStorage.setItem("color-mode", "light")
  		return;
  	}      
    document.documentElement.setAttribute("color-mode", "dark");
  	localStorage.setItem("color-mode", "dark");
  };
  const toggleColorButtons = document.querySelectorAll(".color-mode__btn");
  toggleColorButtons.forEach(btn => {
      btn.addEventListener("click", toggleColorMode);
  });
  
  /* ---sns notifications--- */
  const toast = document.querySelector(".toast_wraper");
  const today = new Date()
  
  window.addEventListener("load", () => {
    const s = localStorage.getItem("snsK");
    if(s === undefined || s === null) {
      toast.style.display = "grid";
    } else if(new Date(Date.parse(s) + (14 * 24 * 60 * 60 * 1000)) <= today) {
      toast.style.display = "grid";
      localStorage.setItem("snsK", date);
    } else {
      toast.style.display = "none";
    }
  });

  function close_toast() {
    toast.style.display = "none";
    localStorage.setItem("snsK", today);
  }
  </script>
  
  </body>
  </html>`
};

module.exports = h;
