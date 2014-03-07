package com.practice;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class Sudoku extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.write(getPuzzle());
	}
	
	private String getPuzzle(){
		Gson gson = new Gson();
		int [][][][] table = {{{{1, 2, 3},{4, 5, 6},{7, 8, 9}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}}},
				             {{{0, 0, 0},{0, 0, 0},{0, 0, 0}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}}},
				             {{{0, 0, 0},{0, 0, 0},{0, 0, 0}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}},{{0, 0, 0},{0, 0, 0},{0, 0, 0}}}};
		return gson.toJson(table);
	}
}
