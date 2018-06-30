const createQueries = require("../db/queries/index_querry"),
	responsiveDiv = `<div class="fl w-100-ns w-50-m w-25-l pa2 gallery">`,
	captionDiv = `<div id="caption">`,
	captionSpan = `<span class="text">`,
	/*	detail = `<div class="mt2 f6">`,
		/!*like = `<p class="ml0 black w-100 tc avenir">Like: 0</p>`,
		comment = `<p class="ml0 black w-100 tc avenir">Comment: 0</p>`,*!/*/
	closeDiv = `</div></div>`;

//Don't forget close tag
async function findID() {
	const picturesData = await createQueries.showPikka(),
		picturesID = [];
	for (let i in picturesData) {
		picturesID.push(picturesData[i]["id"]);
	}
	return picturesID;
}

async function findCaption() {
	const picturesData = await createQueries.showPikka(),
		picturesCaption = [];
	for (let i in picturesData) {
		picturesCaption.push(picturesData[i]["caption"]);
	}
	return picturesCaption;
}

async function makeGallery() {
	const picturesIDArr = await findID(),
		picturesCaptionArr = await findCaption();
	let gallery = ``;
	if (Array(picturesCaptionArr).length === Array(picturesIDArr).length) {
		for (let i in picturesIDArr) {
			gallery += `${responsiveDiv}<a href="pikka/${picturesIDArr[i]}">${captionDiv}${captionSpan}<h4>${picturesCaptionArr[i]}</h4></span></span><img src="pikka/upload/${picturesIDArr[i]}"/></a>${closeDiv}`;
		}
		return gallery;
	}
}

makeGallery();

module.exports = {
	makeGallery
};