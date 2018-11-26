
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
      	createdfile = gbrFolder.getFilesByName(currentMonth).next().getId();
		writeTemplete(createdfile, date);

	}

	writeData(currentFileId, start, target, tarm)

}

function writeTemplete(createdFileId, currentDate) {
	var fileId = createdFileId;
  	Logger.log(fileId);
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	var lastDay = new Date(year, month, 0).getDate();
	var darStr = ["日", "月", "火", "水", "木", "金", "土"];

	//chage sheet name
	var spreadsheet = SpreadsheetApp.openById(fileId);
	var sheet = spreadsheet.getSheetByName("シート1");
	sheet.setName("勤務時間");

	//write title
	var title = [["日付", "開始時間", "終了時間"]];
	sheet.getRange("A1:C1").setValues(title);

	//write date in this month
	for (var i = 1; i <= lastDay; i++) {
		var tmpDate = new Date(year, month, i);
		var inputDate = month + "/" + i + "(" + darStr[tmpDate.getDay()] + ")";
		var row = i + 1;
		sheet.getRange("A" + row).setValue(inputDate);
	}

}

function writeData(currentFileId, target, start, term) {
	var fileId = currentFileId;
	Logger.log(currentFileId, target, start, term)

	var spreadsheet = SpreadsheetApp.openById(currentFileId);
	var sheet = spreadsheet.getSheetByName("勤務時間");

	var targetDay = target.match(/..$/);
	var row = targetDay + 1;

	var inputData = [[start, term]];
	sheet.getRange("B" + row + ":C" + row).setValues(inputData);
}

