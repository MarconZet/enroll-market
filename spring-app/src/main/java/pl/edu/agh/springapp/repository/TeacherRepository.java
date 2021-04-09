package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Teacher;

@Repository
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}