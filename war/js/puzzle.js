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

function numberAtPos(pos){
	return this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex].number;
}

function isBlankAtPos(pos){
	return (this.numberAtPos(pos) == 0);
}

function isNumberFitInPos(number, pos){
	var neighbors = pos.neighborsInSameBlock().concat(pos.neighborsInSameRow().concat(pos.neighborsInSameColumn()))
	return this.isNumberUniqueAmongNeighbors(neighbors, number);
}

function updateSolution(number, pos){
	this.solution[pos.blockRowIndex][pos.blockColumnIndex][pos.cellRowIndex][pos.cellColumnIndex].number = number;
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

model.listener = controller;