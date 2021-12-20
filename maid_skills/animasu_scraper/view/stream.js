module.exports = (data) => { return `<iframe id="stream" src="${data.video}"  width="480" height="270"></iframe>
<div class="navbar">${data.nav}</div>
<div class="stream">
  <h3>${data.title}</h3>
  <p>Jika terjadi masalah saat memutar video, coba gunakan server lain:
    <select id="server" onchange="newSrc()">
      ${data.server}
    </select>
  jika sakit berlanjut hubungi dokter.</p>
  
  <h3>Episode</h3><br>
  <div class="eps_list_wraper">
    <div class="eps_list">${data.episod}</div>
  </div>
</div>
<script type="text/javascript">
    function newSrc() {
      var e = document.getElementById("server");
      var newSrc = e.options[e.selectedIndex].value;
      document.getElementById("stream").src=newSrc;
    }
</script>`}