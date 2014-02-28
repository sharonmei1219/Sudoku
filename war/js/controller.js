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
			this.loadCell(pos);
		}
	}

};

function loadCell(pos){
	var cellView = view.getCellView(pos);
	if (model.isBlankAtPos(pos)) return;
	var number = model.numberAtPos(pos);
	cellView.value = number;
	cellView.disabled = true;
}

function solutionUpdated(number, pos, valid){
	var cell = view.getCellView(pos);
	cell.style.color = "blue";
	if(!valid) {
		cell.style.color = "red";
	}
	changeDisplay(cell, number);
}


var controller = {load:loadGame,
		          loadBlock:loadBlock,
		          loadCell:loadCell,
		          solutionUpdated:solutionUpdated};

model.listener = controller;

//--------------------View-------------------
function getCellView(pos){
	var cellID = this.cellID_prefix + pos.toString();
	return document.getElementById(cellID);
}


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

function getPos(cell){
	var str = cell.id.substr(this.cellID_prefix.length);
	return parseStringToPos(str);
}

var view = {getCellView:getCellView,
		    drawTable:drawTable,
		    checkWhetherKeyIsANumberKey:checkWhetherKeyIsANumberKey,
		    getPos:getPos,
		    cellID_prefix:"CELL"};

function keyPressed(e) {
	var key = event.keyCode ? event.keyCode : event.which;
	var number = String.fromCharCode(key);
	var pos = view.getPos(this);
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

