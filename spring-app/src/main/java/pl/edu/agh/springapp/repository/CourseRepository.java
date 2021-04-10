package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.DayOfWeek;
import pl.edu.agh.springapp.data.model.Teacher;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
    List<Course> findByStartTimeAndTeacherAndDay(LocalTime startTime, Teacher teacher, DayOfWeek day);
}