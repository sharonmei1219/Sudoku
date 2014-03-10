package repository;

import static org.junit.Assert.*;

import java.sql.SQLException;

import org.junit.Before;
import org.junit.Test;

public class TestJDBCPuzzleDao {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() throws SQLException {
		JDBCPuzzleDao dao = new JDBCPuzzleDao();
		dao.getPuzzle();
	}

}
