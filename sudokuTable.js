function cellInput(inputName){
    document.write("<td><input class='number' id='CELL"+inputName+"' type='text' name='"+inputName+"'  maxlength='1'></td>");
}

function aRowInTableOfNumber(rowName){
    document.write("<tr>");
    for(var cell=0; cell<3; cell++){
        cellInput(rowName+cell);
    }
    document.write("</tr>");
}

function aTableOfNumber(tableName){
    document.write("<td><table class='tableOfNumber'>");
    for(var row=0; row<3; row++){
        aRowInTableOfNumber(tableName + row);
    }
    document.write("</table></td>");
}

function aRowInTableOfTable(rowName){
    document.write("<tr>");
    for(var cell=0; cell<3; cell++){
        aTableOfNumber(rowName + cell);
    }
    document.write("</tr>");
}

function sudokuTable(){
    document.write("<table class='tableOftable'>");
    for(var row=0; row<3; row++){
        aRowInTableOfTable(row.toString());
    }
    document.write("</table>");

    var x=document.getElementsByClassName("number");
    for(var i=0; i<x.length; i++){
        x[i].onkeydown = checkWhetherKeyIsANumberKey;
        x[i].onkeypress = handleUserInput;
    }
}

function checkWhetherKeyIsANumberKey(event){
    var key = event.keyCode ? event.keyCode :event.which;
    if(isNaN(String.fromCharCode(key)) && key != 8) return false;
};

function handleUserInput(e){
    var key = event.keyCode ? event.keyCode : event.which;
    var number = String.fromCharCode(key);
    this.style.color = "blue";
    var neighborInSameBlock = getNeighborInSameBlock(this);
    if(!validateInput(neighborInSameBlock, number)){
         this.style.color = "red";
    }

    var neighborInSameRaw = getNeighborInSameRaw(this);
    if(!validateInput(neighborInSameRaw, number)){
	this.style.color = "red";
    }

    var neighborInSameColum = getNeighborInSameColum(this);
    if(!validateInput(neighborInSameColum, number)){
	this.style.color = "red";
    }

    changeDisplay(this, number);
}

function validateInput(neighbor, number){
   for(var i = 0; i < neighbor.length; i++){
	if(neighbor[i].value === number.toString()){
	    return false;
	}
    }
    return true;
}

function getNeighborInSameRaw(cell){
    var result = new Array();
    var BlockRaw = cell.id.charAt(4);
    var cellRaw  = cell.id.charAt(6);
    for(var BlockColum = 0; BlockColum < 3; BlockColum ++){
	for(var cellColum = 0; cellColum < 3; cellColum ++){
	    result.push(document.getElementById("CELL"+BlockRaw+BlockColum+cellRaw+cellColum));
	}
    }
    return result;
}

function getNeighborInSameColum(cell){
    var result = new Array();
    var BlockColum = cell.id.charAt(5);
    var cellColum  = cell.id.charAt(7);
    for(var BlockRaw = 0; BlockRaw < 3; BlockRaw ++){
	for(var cellRaw = 0; cellRaw < 3; cellRaw ++){
	    result.push(document.getElementById("CELL"+BlockRaw+BlockColum+cellRaw+cellColum));
	}
    }
    return result;
}

function getNeighborInSameBlock(cell){
    var result = new Array();
    var BlockRaw = cell.id.charAt(4);
    var BlockColum = cell.id.charAt(5);
    for(var cellRaw = 0; cellRaw < 3; cellRaw ++){
	for(var cellColum = 0; cellColum < 3; cellColum ++){
	    result.push(document.getElementById("CELL"+BlockRaw+BlockColum+cellRaw+cellColum));
	}
    }
    return result;
}

function changeDisplay(cell, number){
    cell.value=number;
}

var puzzle=[
[[
[{number:2},{number:1},{number:0}] ,
[{number:0},{number:0},{number:8}] ,
[{number:0},{number:0},{number:0}]
],
[
[{number:0},{number:0},{number:0}],
[{number:0},{number:0},{number:9}],
[{number:1},{number:5},{number:2}]
],
[
[{number:0},{number:5},{number:7}],
[{number:0},{number:0},{number:0}],
[{number:9},{number:0},{number:0}]
]],
    //raw 2
[[
[{number:0},{number:9},{number:6}] ,
[{number:4},{number:7},{number:0}] ,
[{number:0},{number:2},{number:0}]
],
[
[{number:4},{number:2},{number:0}],
[{number:0},{number:0},{number:0}],
[{number:0},{number:8},{number:6}]
],
[
[{number:0},{number:3},{number:0}],
[{number:0},{number:2},{number:6}],
[{number:4},{number:7},{number:0}]
]],
    //raw 3
[[
[{number:0},{number:0},{number:2}] ,
[{number:0},{number:0},{number:0}] ,
[{number:9},{number:3},{number:0}]
],
[
[{number:8},{number:1},{number:4}],
[{number:7},{number:0},{number:0}],
[{number:0},{number:0},{number:0}]
],
[
[{number:0},{number:0},{number:0}],
[{number:5},{number:0},{number:0}],
[{number:0},{number:1},{number:8}]
]]
]

var solution = puzzle.slice();

function loadGame(){
    for(var tableRaw = 0; tableRaw < 3; tableRaw++){
	for(var tableInRaw = 0; tableInRaw < 3; tableInRaw ++){
	    for(var raw = 0; raw <3; raw++){
		for(var cell = 0; cell < 3; cell ++){
		    var x = document.getElementById("CELL"+tableRaw+tableInRaw+raw+cell);
		    var number = puzzle[tableRaw][tableInRaw][raw][cell].number;
		    if(number != 0) {
			x.value = number;
			x.disabled = true;
		    }else{
			x.value = null;
		    }
		}
	    }
	}
    }
};
