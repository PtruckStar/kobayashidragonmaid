module.exports = (data) => {
let list = new Array();
data.map((item) => {
  list.push(`
  <li class="splide__slide">
    <div class="sd_item_bg" style="background: url('${item.poster}') no-repeat center; background-size: cover; filter: blur(15px)"></div>
    <div class="sd_item_wrapper">
      <img src="${item.poster}" alt="${item.title}">
      <div class="sd_item_info">
        <h3>${item.title}</h3>
        <span>${item.type}, ${item.eps} ${item.status}</span>
      </div>
    </div>
  </li>`)
})
return list
}