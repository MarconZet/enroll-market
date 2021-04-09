package pl.edu.agh.springapp.domein.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.repository.CourseRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseDto newTeacher(CoursePostDto coursePostDto) {
        Course course = courseMapper.coursePostDtoToCourse(coursePostDto);
        Course savedCourse = courseRepository.save(course);
        CourseDto result = courseMapper.courseToCourseDto(savedCourse);
        return result;
    }

    public List<CourseDto> getAllCourses() {
        List<Course> courses = StreamSupport.stream(courseRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return courseMapper.coursesToCoursesDtos(courses);
    }

    public void deleteCourseWithId(Long id) {
        courseRepository.deleteById(id);
    }
}
