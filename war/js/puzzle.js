var puzzle =[ 
	        [[[0, 0, 0], [0, 0, 0], [0, 0, 0]],
              [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
              [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]],
              [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
              [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]],
               [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
               [[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
	        ]

function numberAtPos(pos){
	return this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex];
}

function isBlankAtPos(pos){
	return (this.numberAtPos(pos) == 0);
}

function isNumberFitInPos(number, pos){
	var neighbors = pos.neighborsInSameBlock().concat(pos.neighborsInSameRow().concat(pos.neighborsInSameColumn()))
	return this.isNumberUniqueAmongNeighbors(neighbors, number);
}

function updateSolution(number, pos){
	this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex] = number;
}

function putNumberInPos(number, pos){
	this.updateSolution(number, pos);
	var valid = this.isNumberFitInPos(number,  pos);
	this.listener.solutionUpdated(number, pos, valid);
}


function isNumberUniqueAmongNeighbors(neighbors, number){
	for(var i = 0; i < neighbors.length; i ++)
		if(this.numberAtPos(neighbors[i]) == number)	return false;
	return true;
}

function init(puzzle){
	this.solution = puzzle.slice();
	this.puzzle = puzzle;
}

var model = {numberAtPos:numberAtPos,
		     isBlankAtPos:isBlankAtPos,
		     putNumberInPos:putNumberInPos,
		     isNumberUniqueAmongNeighbors:isNumberUniqueAmongNeighbors,
		     isNumberFitInPos:isNumberFitInPos,
		     updateSolution:updateSolution,
		     init:init};

