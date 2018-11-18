
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

function writeData(currentFileId) {
	var fileId = currentFileId

	var targetDate = document.targetDay.value;
	var startTime = document.start.value
	var tarminationTime = document.finish.value

	Logger.log(targetDate);
	Logger.log(startTime);
	Logger.log(tarminationTime);

}

function clickBtn(targetDate, startTime, tarminationTime) {
	var date = new Date();

	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var currentMonth = year + month;
	Logger.log(currentMonth)

	var target = targetDate;
	var start = startTime;
	var tarm = tarminationTime;

	Logger.log(target, start, tarm);

	var files = DriveApp.getFilesByName(currentMonth);
	if (files.hasNext()) {
		var currentFileId = files.next().getId();
		Logger.log("currentFileId is " + currentFileId);
		writeData(currentFileId)

	} else {
		Logger.log("no files")
	}

}

