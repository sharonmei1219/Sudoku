package com.practice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Sudoku extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.write(getPuzzle());
	}
	
	private String getPuzzle(){
		StringBuffer puzzle = null;
		puzzle = new StringBuffer("[[[");
		puzzle.append("[0,0,0],");
        puzzle.append("[0,0,0],");
        puzzle.append("[0,0,0]"); 
        puzzle.append("],[");
        puzzle.append("[0,0,0],");
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]"); 
        puzzle.append("],["); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]"); 
        puzzle.append("]],");
//raw 2
        puzzle.append("[["); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]");
        puzzle.append("],["); 
        puzzle.append("[0,0,0],");
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]"); 
        puzzle.append("],["); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]"); 
        puzzle.append("] ],");
//raw 3
        puzzle.append("[["); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]"); 
        puzzle.append("],["); 
        puzzle.append("[0,0,0],");
        puzzle.append("[0,0,0],"); 
        puzzle.append("[0,0,0]");
        puzzle.append("],["); 
        puzzle.append("[1,2,3],"); 
        puzzle.append("[4,5,6],"); 
        puzzle.append("[7,8,9]"); 
        puzzle.append("]]]");
		return puzzle.toString();
	}
}
