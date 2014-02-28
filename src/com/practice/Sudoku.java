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
		puzzle.append("[{number:0},{number:0}, {number:0}],");
        puzzle.append("[{number:0},{number:0}, {number:0}],");
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("],[");
        puzzle.append("[{number:0},{number:0}, {number:0}],");
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("],["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("]],");
//raw 2
        puzzle.append("[["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]");
        puzzle.append("],["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],");
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("],["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("] ],");
//raw 3
        puzzle.append("[["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]"); 
        puzzle.append("],["); 
        puzzle.append("[{number:0},{number:0}, {number:0}],");
        puzzle.append("[{number:0},{number:0}, {number:0}],"); 
        puzzle.append("[{number:0},{number:0}, {number:0}]");
        puzzle.append("],["); 
        puzzle.append("[{number:1},{number:2}, {number:3}],"); 
        puzzle.append("[{number:4},{number:5}, {number:6}],"); 
        puzzle.append("[{number:7},{number:8}, {number:9}]"); 
        puzzle.append("]]]");
		return puzzle.toString();
	}
}
