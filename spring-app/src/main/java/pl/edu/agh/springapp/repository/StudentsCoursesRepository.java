package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.StudentsCourses;

@Repository
public interface StudentsCoursesRepository extends CrudRepository<StudentsCourses, Long> {
}
