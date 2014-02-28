function cellInput(inputName) {
	document.write("<td><input class='number' id='CELL" + inputName
			+ "' type='text' name='" + inputName + "'  maxlength='1'></td>");
}

function aRowInTableOfNumber(rowName) {
	document.write("<tr>");
	for (var cell = 0; cell < 3; cell++) {
		cellInput(rowName + cell);
	}
	document.write("</tr>");
}

function aTableOfNumber(tableName) {
	document.write("<td><table class='tableOfNumber'>");
	for (var row = 0; row < 3; row++) {
		aRowInTableOfNumber(tableName + row);
	}
	document.write("</table></td>");
}

function aRowInTableOfBlock(rowName) {
	document.write("<tr>");
	for (var cell = 0; cell < 3; cell++) {
		aTableOfNumber(rowName + cell);
	}
	document.write("</tr>");
}

function changeDisplay(cell, number) {
	cell.value = number;
}


//--------------------Controller-----------------
function loadGame(aPuzzle) {
    model.init(aPuzzle);
	for (var blockRow = 0; blockRow < 3; blockRow++) {
		for (var blockColumn = 0; blockColumn < 3; blockColumn++) {
			this.loadBlock(blockRow, blockColumn);
		}
	}
};

function loadBlock(blockRow, blockColumn){

	for (var cellRow = 0; cellRow < 3; cellRow++) {
		for (var cellColumn = 0; cellColumn < 3; cellColumn++) {
			var pos = new Pos(blockRow, blockColumn, cellRow, cellColumn);
			this.loadNumberFromModelToCell(pos);
		}
	}

};

function loadNumberFromModelToCell(pos){
	var cellView = mapper.mapPosToCell(pos);
	if (model.isBlankAtPos(pos)) return;
	var number = model.numberAtPos(pos);
	cellView.value = number;
	cellView.disabled = true;
}

function solutionUpdated(number, pos, valid){
	var cell = mapper.mapPosToCell(pos);
	cell.style.color = "blue";
	if(!valid) {
		cell.style.color = "red";
	}
	changeDisplay(cell, number);
}


var controller = {load:loadGame,
		          loadBlock:loadBlock,
		          loadNumberFromModelToCell:loadNumberFromModelToCell,
		          solutionUpdated:solutionUpdated};

model.listener = controller;

//--------------------View-------------------
function drawTable() {
	document.write("<table class='tableOftable'>");
	for (var row = 0; row < 3; row++) {
		aRowInTableOfBlock(row.toString());
	}
	document.write("</table>");

	var x = document.getElementsByClassName("number");
	for (var i = 0; i < x.length; i++) {
		x[i].onkeydown = this.checkWhetherKeyIsANumberKey;
		x[i].onkeypress = keyPressed;
	}
}

function checkWhetherKeyIsANumberKey(event) {
	var key = event.keyCode ? event.keyCode : event.which;
	if (isNaN(String.fromCharCode(key)) && key != 8)
		return false;
};

var view = {drawTable:drawTable,
		    checkWhetherKeyIsANumberKey:checkWhetherKeyIsANumberKey};

function Mapper(){
	this.cellID_prefix = "CELL"
	this.mapCellToPos = function(cell){
		var str = cell.id.substr(this.cellID_prefix.length);
		return parseStringToPos(str);
	}
	
	this.mapPosToCell = function(pos){
		var cellID = this.cellID_prefix + pos.toString();
		return document.getElementById(cellID);
	}
};

mapper = new Mapper();

function keyPressed(e) {
	var key = event.keyCode ? event.keyCode : event.which;
	var number = String.fromCharCode(key);
	var pos = mapper.mapCellToPos(this);
	model.putNumberInPos(number, pos);
}

function loadPuzzle() {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			controller.load(eval('(' + this.responseText + ')'));
		} 
	}
	httpRequest.open("GET", "sudoku");
	httpRequest.send();
}

