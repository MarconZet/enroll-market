package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.data.model.TimeBlock;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface TimeBlockRepository extends CrudRepository<TimeBlock, Long> {
}