
function doGet() {
	return HtmlService.createTemplateFromFile("index").evaluate();
}

function include(stylesheet) {
	return HtmlService.createHtmlOutputFromFile("stylesheet").getContent();
}

function getCurrentDate(type) {
	var date = new Date();

	if (type === "date") {
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2)
		var currentTime = year + "-" + month + "-" + day;

		return currentTime;

	} else if (type === "time") {
		var hour = ("0" + date.getHours()).slice(-2);
		var minute = ("0" + date.getMinutes()).slice(-2);

		return hour + ":" + minute;
	}
}

function clickBtn() {
	Logger.log("test");

	var files = DriveApp.getFilesByName("201811");
	Logger.log(files)

}

