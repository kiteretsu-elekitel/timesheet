
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
	var year = currentDate.getFullYear;
	var month = currentDate.getMonth;
	var lastDay = new Date(year, month, 0);
	var darStr = ["日", "月", "火", "水", "木", "金", "土"];

	//sheet名変更
	var spreadsheet = SpreadsheetApp.openById(fileId);
	var sheet = spreadsheet.getSheetByName("シート1");
	sheet.setName("勤務時間");

	//項目名書き込み
	var title = ["日付", "開始時間", "終了時間"];
	sheet.getRange("A1:A3").setValue(title);

	//日付をあらかじめ書き込む
	for (var i = 1; i <= lastDay; i++) {
		var tmpDate = new Date(year, month, i);
		var inputDate = month + "/" + i + "(" + darStr[tmpDate.getDay] + ")";
		var row = i + 1;
		sheet.getRange("A" + i).setValue(inputDate);
	}

}

function writeData(currentFileId, target, start, term) {
	var fileId = currentFileId;

}

