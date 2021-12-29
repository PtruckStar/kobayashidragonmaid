module.exports = async (data, status, getUrl) => {
  let items = new Array()
  await data.map((i, x) => {
    let s = x == 0 ? `<i> ${status}</i>` : "";
    items.push(
      `<li>
        <span>${i.title + s}</span>
        <a href="${getUrl(i.url)}">play
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="play_svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        </a>
      </li>`
    );
  });
  return items
};
