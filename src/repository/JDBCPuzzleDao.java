package repository;

import java.sql.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hsqldb.jdbcDriver;

public class JDBCPuzzleDao implements PuzzleDao {

	@Override
	public int[] getPuzzle() throws SQLException {
		String url = "jdbc:hsqldb:hsql://localhost";
		String user = "sa";
		String password = "";
	    try {
	        Class.forName("org.hsqldb.jdbcDriver");
	    } catch (Exception e) {
	        System.out.println("ERROR: failed to load HSQLDB JDBC driver.");
	        e.printStackTrace();
	        return null;
	    }
		Connection conn = DriverManager.getConnection(url, user, password);
		Statement st = conn.createStatement();
		
		String cmd = "select * from puzzles where id = 2";
		ResultSet rs = st.executeQuery(cmd);
		rs.next();
		Array description = rs.getArray("number");
		conn.close();
		System.out.print(description);
		return new int[]{1, 2};
	}

}
