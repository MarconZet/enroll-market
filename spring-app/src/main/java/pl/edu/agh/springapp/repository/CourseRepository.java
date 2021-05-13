package pl.edu.agh.springapp.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.*;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface CourseRepository extends PagingAndSortingRepository<Course, Long> {
    List<Course> findByStartTimeAndTeacherAndDay(LocalTime startTime, Teacher teacher, DayOfWeek day);

    List<Course> findByStartTimeAndTeacherAndDayAndWeekType(LocalTime startTime, Teacher teacher, DayOfWeek day, WeekType weekType);

    List<Course> findBySubjectAndType(Subject subject, CourseType type);

    @Query("select distinct c from Course c"
            + " join c.students s"
            + " where s.indexNumber=:indexNumber")
    List<Course> findCoursesOfStudent(@Param("indexNumber") String indexNumber);
}