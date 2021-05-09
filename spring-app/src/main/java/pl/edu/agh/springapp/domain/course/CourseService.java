package pl.edu.agh.springapp.domain.course;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.repository.CourseRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseDto newCourse(CoursePostDto coursePostDto) {
        Course course = courseMapper.coursePostDtoToCourse(coursePostDto);
        Course savedCourse = courseRepository.save(course);
        CourseDto result = courseMapper.courseToCourseDto(savedCourse);
        return result;
    }

    public Page<CourseDto> getAllCourses(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        return courseRepository.findAll(paging).map(courseMapper::courseToCourseDto);
    }

    public void deleteCourseWithId(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new EntityNotFoundException(Course.class, id);
        }
        courseRepository.deleteById(id);
    }

    public CourseDto getCourseWithId(Long id) {
         Course course = courseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Course.class, id));
        return courseMapper.courseToCourseDto(course);
    }
}
