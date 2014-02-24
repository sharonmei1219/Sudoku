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
			this.loadCell(blockRow, blockColumn, cellRow, cellColumn);
		}
	}

};

function loadCell(blockRow, blockColumn, cellRow, cellColumn){

	var cellView = view.getCellView(blockRow, blockColumn, cellRow, cellColumn);

	if (model.isBlankAtPos(blockRow, blockColumn, cellRow, cellColumn)) return;
	var number = model.getNumberAtPos(blockRow, blockColumn, cellRow, cellColumn);
	cellView.value = number;
	cellView.disabled = true;

}

function numberAtPosChanged(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex, valid){
	var cell = view.getCellView(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
	cell.style.color = "blue";
	if(!valid) {
		cell.style.color = "red";
	}
	changeDisplay(cell, number);
}


var controller = {load:loadGame,
		          loadBlock:loadBlock,
		          loadCell:loadCell,
		          numberAtPosChanged:numberAtPosChanged};



//--------------------View-------------------
function getCellView(blockRow, blockColumn, cellRow, cellColumn){
	return document.getElementById(this.cellID_prefix + blockRow + blockColumn + cellRow + cellColumn);
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

function rowIndexOfTheBlockWithinWhichCellBelongs(cellInView){
	return cellInView.id.charAt(this.cellID_prefix.length);
}

function columnIndexOfTheBlockWithinWhichCellBelongs(cellInView){
	return cellInView.id.charAt(this.cellID_prefix.length + 1);
}

function rowIndexOfACell(cellInView){
	return cellInView.id.charAt(this.cellID_prefix.length + 2);
}

function columnIndexOfACell(cellInView){
	return cellInView.id.charAt(this.cellID_prefix.length + 3);
}

var view = {getCellView:getCellView,
		    drawTable:drawTable,
		    checkWhetherKeyIsANumberKey:checkWhetherKeyIsANumberKey,
		    rowIndexOfTheBlockWithinWhichCellBelongs:rowIndexOfTheBlockWithinWhichCellBelongs,
		    columnIndexOfTheBlockWithinWhichCellBelongs:columnIndexOfTheBlockWithinWhichCellBelongs,
		    rowIndexOfACell:rowIndexOfACell,
		    columnIndexOfACell:columnIndexOfACell,
		    cellID_prefix:"CELL"};



function keyPressed(e) {
	var key = event.keyCode ? event.keyCode : event.which;
	var number = String.fromCharCode(key);
	
	var blockRowIndex = view.rowIndexOfTheBlockWithinWhichCellBelongs(this);
	var blockColumnIndex = view.columnIndexOfTheBlockWithinWhichCellBelongs(this);
	var cellRowIndex = view.rowIndexOfACell(this);
	var cellColumnIndex = view.columnIndexOfACell(this);
	
	model.putNumberInPos(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
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

function getNumberAtPos(blockRow, blockColumn, cellRow, cellColumn){
	return this.puzzle[blockRow][blockColumn][cellRow][cellColumn].number;
}

function isBlankAtPos(blockRow, blockColumn, cellRow, cellColumn){
	return (getNumberAtPos(blockRow, blockColumn, cellRow, cellColumn) == 0);
}

function isInputNumberFitInPos(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	var valid = true;
	var neighborInSameBlock_v2 = model.getNeighborInSameBlock_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
	if(!model.validateInput_v2(neighborInSameBlock_v2, number)){
		valid = false;
	}
	
	var neighborInSameRow = model.getNeighborInSameRaw_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
	if(!model.validateInput_v2(neighborInSameRow, number)){
		valid = false;
	}

	var neighborInSameColumn_v2 = model.getNeighborInSameColumn_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
	if(!model.validateInput_v2(neighborInSameColumn_v2, number)){
		valid = false;
	}
	
	return valid;
}

function putNumberInPos(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	var valid = this.isInputNumberFitInPos(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
	controller.numberAtPosChanged(number, blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex, valid);
}

function validateInput_v2(neighbors, number){
	for(var i = 0; i < neighbors.length; i ++){
		if(neighbors[i] == number) {
			return false;
		}
	}
	return true;
}

function getNeighborInSameRaw_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	var result = new Array();

	for(var blockColumn = 0; blockColumn < 3; blockColumn ++){
		for(var cellColumn = 0; cellColumn < 3; cellColumn ++){
			if ((blockColumn != blockColumnIndex) || (cellColumn != cellColumnIndex)){
				result.push(this.solution[blockRowIndex][blockColumn][cellRowIndex][cellColumn].number);
			}
		}
	}
	return result;

}

function getNeighborInSameColumn_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	var result = new Array();
	for(var blockRow = 0; blockRow < 3; blockRow ++){
		for(var cellRow = 0; cellRow < 3; cellRow ++){
			if((blockRow != blockRowIndex) || (cellRow != cellRowIndex)){
				result.push(this.solution[blockRow][blockColumnIndex][cellRow][cellColumnIndex].number);
			}
		}
	}
	return result;
}

function getNeighborInSameBlock_v2(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	var result = new Array();
	for(var neighborRow = 0; neighborRow < 3; neighborRow ++){
		for(var neighborColumn = 0; neighborColumn < 3; neighborColumn ++){
			if((neighborRow != cellRowIndex) || (neighborColumn != cellColumnIndex)){
				result.push(this.solution[blockRowIndex][blockColumnIndex][neighborRow][neighborColumn].number);
			}
		}
	}
	return result;
}

var solution = puzzle.slice();

var model = {puzzle:puzzle,
		     getNumberAtPos:getNumberAtPos,
		     isBlankAtPos:isBlankAtPos,
		     putNumberInPos:putNumberInPos,
		     getNeighborInSameRaw_v2:getNeighborInSameRaw_v2,
		     getNeighborInSameColumn_v2:getNeighborInSameColumn_v2,
		     getNeighborInSameBlock_v2:getNeighborInSameBlock_v2,
		     validateInput_v2:validateInput_v2,
		     isInputNumberFitInPos:isInputNumberFitInPos,
		     solution:solution};



//--------------Pos-----------------
function Pos(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex){
	this.blockRowIndex = blockRowIndex;
	this.blockColumnIndex = blockColumnIndex;
	this.cellRowIndex = cellRowIndex;
	this.cellColumnIndex = cellColumnIndex;
}