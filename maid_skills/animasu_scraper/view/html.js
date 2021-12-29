const h = (content, title) => { return `
  <html color-mode="light">
  <head>
  <title>${title}</title>
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
    }
    :root[color-mode="light"] {
      --background: #f1f1f1;
      --foreground: #fff;
      --lighten: #D0D0D0;
      --blues: #3478F6;
      --shadow: #E4E4E4;
      --text: black;
      --subtext: #444;
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
    ul.eps_list > li:nth-of-type(odd) {
      background-color: var(--background);
    }
    ul.eps_list > li > a {
      float: right;
      color: var(--blues);
      display: flex;
      align-items: center;
    }
    ul.eps_list > li > span {
      text-overflow: ellipsis; 
      overflow: hidden; 
      white-space: nowrap;
      display: inline-block;
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
      
    #footer {
      margin: 2rem;
      text-align: center;
      color: var(--lighten);
    }
    .notfound {
      font-size: 3rem;
      color: var(--lighten);
      text-align: center;
      vertical-align: middle;
      margin-top:3rem
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
    
    .color-mode__btn{
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
    
    .shadow {
      box-shadow: 
        -5px -5px 5px -3px var(--shadow),
        5px 5px 5px -3px var(--shadow);
    }
    
    @media(min-width:48em) {
      .list-wraper {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  </style>
  </head>
  <body>
  
  <div id="content">
    ${content}
  </div>
  
  <div id="footer">
    <p>rahayu.</p>
  </div>
  
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
  </script>
  
  </body>
  </html>`
};

module.exports = h;
