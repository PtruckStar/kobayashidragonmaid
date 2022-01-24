module.exports = async data => {
  let list = new Array();
  await data.map(t => {
    const get_url = new URL(t.url).pathname;
    list.push(`<a class="list shadow" href="${get_url}"><img src="${t.poster}" alt="${t.title}"><div class="list_info"><h3 class="list-title">${t.title}</h3><span class="list-info">${t.type}, ${t.eps} ${t.status}</span></div></a>`);
  });
  return list
};
