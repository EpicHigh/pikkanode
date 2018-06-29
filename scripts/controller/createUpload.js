const createQueries = require("../db/queries/create_querry"),
	uuidv4 = require("uuid/v4"),
	path = require("path"),
	fsx = require("fs-extra"),
	allowFileType = {
		"image/png": true,
		"image/jpeg": true,
		"image/jpg": true
	};

function createID() {
	const id = uuidv4();
	return String(id).slice(0, String(id).indexOf("-"));
}

function fileTypeSlicing(fileTypeRaw) {
	return String(fileTypeRaw).slice(
		String(fileTypeRaw).indexOf("/") + 1,
		String(fileTypeRaw).length
	);
}

async function uploadHandler(ctx) {
	try {
		const fileType = ctx.request.files.photo.type,
			id = createID(),
			fileTypeSliced = fileTypeSlicing(fileType),
			caption = ctx.request.body["caption"],
			filePath = ctx.request.files.photo.path;
		if (!allowFileType[fileType]) {
			ctx.session.flash = {
				error: "Sorry, This file type is not allowed yet"
			};
			await fsx.remove(ctx.request.files.photo.path);
			console.log("Sorry, This file type is not allowed yet");
			return ctx.redirect("/create");
		} else {
			fsx.rename(filePath, path.join(__dirname + "/../../public/pikka/upload", `${id}.${fileTypeSliced}`))
			.then(res => {
				console.log(`Upload Susccessfully: ${res}`);
				createQueries.addPikka(
					id,
					fileTypeSliced,
					caption,
					ctx.session.userId.id
				);
			})
			.catch(err => console.error(err));
			ctx.session.uploadSuccess = {success: true};
			return ctx.redirect("/create");
		}
	} catch (e) {
		ctx.status = 400;
		ctx.body = e.message;
		// remove a uploaded temporary file when the error occurs
		await fsx.remove(ctx.request.files.photo.path);
	}
}

module.exports = {
	uploadHandler
};
