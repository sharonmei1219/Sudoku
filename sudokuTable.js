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
function loadGame() {

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
	var number = model.getNumberAtPos(pos);
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



//--------------------View-------------------
function getCellView(pos){
	var cellID = this.cellID_prefix + pos.blockRowIndex + pos.blockColumnIndex + pos.cellRowIndex + pos.cellColumnIndex;
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
	var blockRowIndex = cell.id.charAt(this.cellID_prefix.length);
	var blockColumnIndex = cell.id.charAt(this.cellID_prefix.length+1);
	var cellRowIndex = cell.id.charAt(this.cellID_prefix.length+2);
	var cellColumnIndex = cell.id.charAt(this.cellID_prefix.length+3);
	
	return new Pos(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
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



//-------------------Model-----------------------
var puzzle = [ 
               [ [ 
                   [{number:2},{number:1}, {number:0}], 
                   [{number:0},{number:0}, {number:8}],
                   [{number:0},{number:0}, {number:0}] 
                 ],[
                   [{number:0},{number:0}, {number:0}],
                   [{number:0},{number:0}, {number:9}], 
                   [{number:1},{number:5}, {number:2}] 
                 ],[ 
                   [{number:0},{number:5}, {number:7}], 
                   [{number:0},{number:0}, {number:0}], 
                   [{number:9},{number:0}, {number:0}] 
               ] ],
// raw 2
               [ [ 
                   [{number:0},{number:9}, {number:6}], 
                   [{number:4},{number:7}, {number:0}], 
                   [{number:0},{number:2}, {number:0}]
                 ],[ 
                   [{number:4},{number:2}, {number:0}],
                   [{number:0},{number:0}, {number:0}], 
                   [{number:0},{number:8}, {number:6}] 
                 ],[ 
                   [{number:0},{number:3}, {number:0}], 
                   [{number:0},{number:2}, {number:6}], 
                   [{number:4},{number:7}, {number:0}] 
               ] ],
// raw 3
               [ [ 
                   [{number:0},{number:0}, {number:2}], 
                   [{number:0},{number:0}, {number:0}], 
                   [{number:9},{number:3}, {number:0}] 
                 ],[ 
                   [{number:8},{number:1}, {number:4}],
                   [{number:7},{number:0}, {number:0}], 
                   [{number:0},{number:0}, {number:0}]
                 ],[ 
                   [{number:0},{number:0}, {number:0}], 
                   [{number:5},{number:0}, {number:0}], 
                   [{number:0},{number:1}, {number:8}] 
               ] ] 
]

function getNumberAtPos(pos){
	return this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex].number;
}

function isBlankAtPos(pos){
	return (getNumberAtPos(pos) == 0);
}

function isNumberFitInPos(number, pos){
	var neighbors = pos.neighborsInSameBlock().concat(pos.neighborsInSameRow().concat(pos.neighborsInSameColumn()))
	return this.isNumberUniqueAmongNeighbors(neighbors, number);
}

function updateSolution(number, pos){
	this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex].number = number;
}

function putNumberInPos(number, pos){
	var valid = this.isNumberFitInPos(number,  pos);
	this.updateSolution(number, pos);
	this.listener.solutionUpdated(number, pos, valid);
}


function isNumberUniqueAmongNeighbors(neighbors, number){
	for(var i = 0; i < neighbors.length; i ++)
		if(this.getNumberAtPos(neighbors[i]) == number)	return false;
	return true;
}


var solution = puzzle.slice();

var model = {puzzle:puzzle,
		     getNumberAtPos:getNumberAtPos,
		     isBlankAtPos:isBlankAtPos,
		     putNumberInPos:putNumberInPos,
		     isNumberUniqueAmongNeighbors:isNumberUniqueAmongNeighbors,
		     isNumberFitInPos:isNumberFitInPos,
		     updateSolution:updateSolution,
		     solution:solution};

model.listener = controller;


//--------------Pos-----------------
function Pos(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex) {
	this.blockRowIndex = blockRowIndex;
	this.blockColumnIndex = blockColumnIndex;
	this.cellRowIndex = cellRowIndex;
	this.cellColumnIndex = cellColumnIndex;
	
	this.neighborsInSameRow = function() {
		var result = new Array();
		for (var neighborBlockColum = 0; neighborBlockColum < 3; neighborBlockColum++) {
			for (var neighborCellColumn = 0; neighborCellColumn < 3; neighborCellColumn++) {
				if((neighborBlockColum != this.blockColumnIndex) || (neighborCellColumn != this.cellColumnIndex)){
					result.push(new Pos(this.blockRowIndex, neighborBlockColum,	this.cellRowIndex, neighborCellColumn));
				}
			}
		}

		return result;
	}
	
	this.neighborsInSameBlock = function(){
		var result = new Array();
		for (var neighborCellRow = 0; neighborCellRow < 3; neighborCellRow++) {
			for (var neighborCellColumn = 0; neighborCellColumn < 3; neighborCellColumn++) {
				if((neighborCellRow != this.cellRowIndex) || (neighborCellColumn != this.cellColumnIndex)){
					result.push(new Pos(this.blockRowIndex, this.blockColumnIndex,	neighborCellRow, neighborCellColumn));
				}
			}
		}

		return result;
	}
	
	this.neighborsInSameColumn = function(){
		var result = new Array();
		for (var neighborBlockRow = 0; neighborBlockRow < 3; neighborBlockRow++) {
			for (var neighborCellRow = 0; neighborCellRow < 3; neighborCellRow++) {
				if((neighborBlockRow != this.blockRowIndex) || (neighborCellRow != this.cellRowIndex)){
					result.push(new Pos(neighborBlockRow, this.blockColumnIndex,	neighborCellRow, this.cellColumnIndex));
				}
			}
		}

		return result;
	}
	
	this.toString = function(){
		return "" + this.blockRowIndex + this.blockColumnIndex + this.cellRowIndex + this.cellColumnIndex;
	}
}


