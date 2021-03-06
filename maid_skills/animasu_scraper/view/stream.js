module.exports = (data) => {
  let nav = `<div class="navbar shadow">${data.nav}</div>`;
  let eps = `<h3>Episode</h3>
   <div class="eps_list_wraper">
     <ul class="eps_list">${data.episod.join("")}</ul>
   </div>`;

  if (data.title.includes("Movie") || data.episod.length < 1) {
    (nav = ""), (eps = "");
  }
  if (data.video === "")
    return `<span class="notfound">Segera Tayang.<h3 style="font-size:1.5rem;">${data.title}</h3></span>`;

  return `
  <div class="stream_container shadow">
    <iframe id="stream" src="${data.video}" allow="fullscreen"></iframe>
    <span class="loader">Sedang memuat anime anda...</span>
  </div>
  ${nav}
  <section class="stream_info shadow">
    <div class="info_wrapper">
      <h3>${data.title}</h3>
      <p>Jika terjadi masalah saat memutar video, coba gunakan server lain:
        <select id="server" onchange="newSrc()">
          ${data.server}
        </select>
      jika sakit berlanjut hubungi dokter.</p>
      ${eps}
    </div>
  </section>
  <script type="text/javascript">
    function newSrc() {
      var e = document.getElementById("server");
      var newSrc = e.options[e.selectedIndex].value;
      document.getElementById("stream").src=newSrc;
    }
  </script>`;
};
