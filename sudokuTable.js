function cellInput(inputName){
    document.write("<td><input type='text' name='"+inputName+"'></td>");
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
        aRowInTableOfTable(row);
    }
    document.write("</table>");
}
