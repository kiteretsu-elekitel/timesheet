
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
		var minute = date.getMinutes() < 30 ? "00" : "30";

		return hour + ":" + minute;
	}
}

function writeData(currentFileId, target, start, term) {
	var fileId = currentFileId;




}

function clickBtn(targetDate, startTime, tarminationTime) {
	var date = new Date();

	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var currentMonth = year + month;

	var target = targetDate;
	var start = startTime;
	var tarm = tarminationTime;


	Logger.log(target);

	//folder check
	var folders = DriveApp.searchFolders('title = "GBR"');
    Logger.log(folders);
	if (!folders.hasNext()) {
		DriveApp.createFolder("GBR");
		folders = DriveApp.getFoldersByName("GBR");
	}

	var gbrFolder = folders.next()

	//file check in GBR folder
    var files = gbrFolder.searchFiles('title = "' + currentMonth + '"');
	if (files.hasNext()) {
		var currentFileId = files.next().getId();
		Logger.log("currentFileId is " + currentFileId);

	} else {
		//make current month file
		SpreadsheetApp.create(currentMonth);
		var createdfile = DriveApp.getFilesByName(currentMonth).next();

		gbrFolder.addFile(createdfile);
		DriveApp.getRootFolder().removeFile(createdfile);

	}

	writeData(currentFileId, start, target, tarm)

}

