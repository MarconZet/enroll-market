package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.*;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface CourseRepository extends PagingAndSortingRepository<Course, Long> {
    List<Course> findByStartTimeAndTeacherAndDay(LocalTime startTime, Teacher teacher, DayOfWeek day);

    List<Course> findByStartTimeAndTeacherAndDayAndWeekType(LocalTime startTime, Teacher teacher, DayOfWeek day, WeekType weekType);

    List<Course> findBySubjectAndType(Subject subject, CourseType type);
}