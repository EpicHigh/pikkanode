(function () {
	let searchBox = document.getElementById("search-box");
	searchBox.addEventListener("keyup", function (event) {
		let filter = event.target.value;
		console.log(event.target.value);
		let article = document.getElementsByClassName("gallery");
		for (i in article) {
			if (
				String(article[i].innerText)
				.toLowerCase()
				.includes(filter.toLowerCase())
			) {
				article[i].style.display = "block";
			} else {
				article[i].style.display = "none";
			}
		}
	});
})();
