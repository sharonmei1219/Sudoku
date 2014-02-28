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

function parseStringToPos(str){
	var blockRowIndex = str.charAt(0);
	var blockColumnIndex = str.charAt(1);
	var cellRowIndex = str.charAt(2);
	var cellColumnIndex = str.charAt(3);
	return new Pos(blockRowIndex, blockColumnIndex, cellRowIndex, cellColumnIndex);
}
