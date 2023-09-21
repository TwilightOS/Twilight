const search = document.getElementById("uv-address");
const form = document.getElementById("uv-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
    alert('submitted');
	go(search.value);
});

function searchurl(url) {
    alert('search');
	switch (localStorage.getItem("search")) {
		case "DuckDuckGo":
			proxy(`https://duckduckgo.com/?q=${url}`)
			break;
		case "Brave":
			proxy(`https://search.brave.com/search?q=${url}`)
			break;
		case "Google":
			proxy(`https://www.google.com/search?q=${url}`)
			break;
		default:
			localStorage.setItem("search", "Google")
			proxy(`https://google.com/search?q=${url}`)
	}
}

function go(url) {
    alert('go');
	if (!isUrl(url)) {
        searchurl(url); 
    }
    else {
		if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url
		proxy(url)
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
}

function proxy(url) {
    alert('proxy');
	registerSW().then(worker => {
		if(!worker) {
			alert("Error: Your browser does not support service workers;");
		}
		location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
	});
}
