module.exports = (nextpage) => { return `<script>
  const content_element = document.querySelector("#content")
  const nav = document.createElement("nav");
  nav.classList.add("nav_wraper")
  nav.innerHTML = '<div class="nextbtn_wraper"><button id="nextbtn" class="shadow" onclick="load()"> Muat lebih banyak...</button></div><div class="topbtn_wraper"><div class="topbtn_mid_wraper"><div class="topbtn_inner_wraper"><button onclick="topFunction()" id="topbtn" style="position:relative;"><span style="visibility:hidden;">top</span><svg style="fill:white;width:1em;height:1em;margin:auto;padding:auto;position:absolute;inset:auto 0;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></button></div></div></div><button class="ghost">hi</button>'
  
  let list_wraper_element = document.querySelector(".list-wraper");
  let nextpage = '${nextpage}', nextbtn, topbtn
  if(nextpage != "none") {
    content_element.appendChild(nav);
    nextbtn = document.querySelector("#nextbtn");
    topbtn = document.querySelector(".topbtn_wraper")
    window.onscroll = function() {scrollFunction()};
    window.onload = () => track_init();
  }
  
  async function load() {
    nextbtn.innerHTML = "Memuat..."
    nextbtn.setAttribute("disabled", "")
    await fetch(nextpage)
    .then(x => x.json())
    .then(data => {
      if(data.list.length < 1) return nextbtn.parentNode.remove();
      data.list.map((i) => {
        list_wraper_element.insertAdjacentHTML('beforeend', i);
      });
      nextpage = data.nextpage;
      nextbtn.innerHTML = "Muat lebih banyak..."
      if(nextpage == "none") nextbtn.parentNode.remove(); //lebih bail display none karena kita buat tab bego!!
      nextbtn.removeAttribute("disabled");
    })
    .catch(e => alert(e));
  }
  
  /* ---back to top function--- */
    const vh = 400;
    
    function scrollFunction() {
      if (document.body.scrollTop > vh || document.documentElement.scrollTop > vh) {
        topbtn.style.opacity = "1";
        topbtn.style.transform = "translateY(0)";
      } else {
        topbtn.style.opacity = "0";
        topbtn.style.transform = "translateY(100px)";
      }
    }
       
    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stick to nav when footer visible
          topbtn.classList.remove("make_it_fly");
        } else {
          // float when footer hidden
          topbtn.classList.add("make_it_fly");
        }
      });
    }
    
    //get the footer positon after window loaded
    function track_init() {
      const footer = document.querySelector("footer");
      const observer = new IntersectionObserver(callback);
      observer.observe(footer);
    }
    
    
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
</script>`}