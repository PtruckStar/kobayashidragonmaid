const h = (content, title, poster) => {
  if(title && !title.includes("hasil penelusuran") && !title.includes("nonton")) title = "Nonton " + title
  return `
  <html color-mode="light">
  <head>
  <title>${(title)? title + " subtitle indonesia" : "Nonton anime gratis subtitle indonesia!"}</title>
  <meta name="description" content="${(title)? title : "Nonton anime"} gratis subtitle indonesia tanpa iklan semuan seri lengkap update tiap hari" />
  ${(poster)? `<meta property="og:image" content="${poster}">` : ""}
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
      --dismiss: #b53b64;
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
    }
    :root[color-mode="light"] .light--hidden {
        display: none;
    }
    :root[color-mode="dark"] .dark--hidden {
        display: none;
    }
    
    * {
      transition: all 0.5s ease-in;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      background-color: var(--background);
      font-family: sans-serif;
    }
    a {
      text-decoration: none;
    }
    
    #content {
      display: grid;
      place-items: center;
      justify-items: center;
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
    }
    a.list > h3 {
      margin: 0;
      padding: 0 0.5rem;
      color: var(--text);
    }
    a.list > span {
      font-size: 0.75rem;
      padding: 0 0.5rem;
      color: var(--subtext);
    }
    
    .search_wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      max-width: 600px;
    }
    form {
      width: 100%;
      background-color: var(--foreground);
      border-radius: 0.5rem;
      padding: 0;
      margin: 1em 0;
      margin-left: 0.5rem;
      overflow: hidden;
      flex-basis: auto;
    }
    input:focus {
      border: none;
      outline: none;
    }
    input[type="text"] {
      width: 70%;
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
    }
      
    .stream_info {
      background-color: var(--foreground);
      border-radius: 0.5rem;
      overflow: hidden;
      padding: 1rem;
      margin-top: 0.5rem;
      max-width: 600px;
      box-sizing: border-box;
    }
    .stream_info > p {
      color: var(--subtext);
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
      margin-top: 0.5rem;
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
      
    footer {
      margin: 2rem;
      text-align: center;
      color: var(--lighten);
      font-weight: bolder;
    }
    .notfound {
      font-size: 3rem;
      color: var(--lighten);
      text-align: center;
      vertical-align: middle;
      margin-top:3rem
    }
    #topbtn {
      color: var(--lighten);
      font-size: 12px;
      font-weight: lighter;
      font-style: italic;
      text-decoration: underline;
      display: none;
    }
    
    #nextbtn {
      background-color: var(--blues);
      color: white;
      font-size: 1em;
      margin-top: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
    }
    #nextbtn[disabled] {
      background-color: grey;
    }
    
    #recommend {
      position: relative;
      display: block;
      z-index: 9;
    }
    #recommend::before {
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      border: none;
    }
    #recommend:hover {
      text-decoration: underline;
      text-decoration-style: wavy;
      text-decoration-color: var(--subtext)
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
      }
      .toast_close_btn {
        background: var(--dismiss);
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin-left: 2rem;
      }
      .toast a {
        display: flex;
        align-items: center;
        color: var(--text)
      }
      .toast i {
        color: var(--blues);
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
    
    @media(min-width:48em) {
      .list-wraper {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  </style>
  </head>
  <body>
  
  <section class="toast_wraper">
    <div class="toast">
      <a href="https://instagram.com/touru_anime">
        <svg class="ig_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span>Follow IG kami <i>@touru_anime</i></span>
      </a>
      <button class="toast_close_btn" onclick="close_toast()">Tutup</button>
    </div>
  </section>
  
  <main id="content">
    ${content}
  </main>
  
  <footer>
    <span">rahayu.</span>
    <a href="#search" id="topbtn">Kembali ke atas⇧</span>
  </footer>
  
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
  
  /* ---back to top function--- */
  const topbtn = document.querySelector("#topbtn")
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      topbtn.style.display = "block";
    } else {
      topbtn.style.display = "none";
    }
  }
  
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  /* ---sns notifications--- */
  const toast = document.querySelector(".toast_wraper");
  const today = new Date()

  window.addEventListener("load", () => {
    const s = localStorage.getItem("snsK");
    if(s === undefined || s === null) {
      toast.style.display = "grid";
    } else if(new Date(Date.parse(s) + (7 * 24 * 60 * 60 * 1000)) <= today) {
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
