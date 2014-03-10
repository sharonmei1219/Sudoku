package repository;

import java.sql.SQLException;

public interface PuzzleDao {
	int [] getPuzzle() throws SQLException;

}
