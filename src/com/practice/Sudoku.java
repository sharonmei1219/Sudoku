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
		puzzle = new StringBuffer("[{number:3}, {number:5}]");
		return puzzle.toString();
	}
}
