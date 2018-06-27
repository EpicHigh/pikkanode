(function () {
	const uploader = document.getElementsByTagName("input");
	uploader[1].onchange = function (event) {
		console.log(`Change`);
		let reader = new FileReader();
		reader.onload = function () {
			const output = document.getElementById("output");
			output.src = reader.result;
		};
		reader.readAsDataURL(event.target.files[0]);
	}
})();