package pl.edu.agh.springapp.domain.course;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.IdListDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.error.WrongPathVariableException;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.specification.CourseSpecifications;
import pl.edu.agh.springapp.repository.specification.OfferSpecifications;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final CourseMapper courseMapper;
    private final CurrentUser currentUser;

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

    public IdListDto getCoursesToEnrollWithoutCollisionTheSameAsCourseWithId(Long id) {
        List<Course> courses = getCoursesWithoutCollision(id);
        return new IdListDto(courses.stream()
                .map(Course::getId)
                .collect(Collectors.toList())
        );
    }


    public boolean enrollToCourseWithoutCollision(Long courseFromId, Long courseToId) {
        Course fromCourse = courseRepository.findById(courseFromId).orElseThrow(() -> new EntityNotFoundException(Course.class, courseFromId));
        Course toCourse = courseRepository.findById(courseToId).orElseThrow(() -> new EntityNotFoundException(Course.class, courseToId));
        Student loggedStudent = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (loggedStudent == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        if (!loggedStudent.getCourses().contains(fromCourse)) {
            throw new WrongPathVariableException("This is not your course!");
        }
        if (!getCoursesToEnrollWithoutCollisionTheSameAsCourseWithId(courseFromId).getIds().contains(courseToId)) {
            throw new WrongPathVariableException("You can not enroll to this course - there is collision!");
        }
        loggedStudent.getCourses().remove(fromCourse);
        loggedStudent.getCourses().add(toCourse);
        studentRepository.save(loggedStudent);
        return true;
    }

    private List<Course> getCoursesWithoutCollision(Long id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Course.class, id));
        Student loggedStudent = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (loggedStudent == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        if (!loggedStudent.getCourses().contains(course)) {
            throw new WrongPathVariableException("This is not your course!");
        }
        Specification<Course> subjectSpec = CourseSpecifications.hasSubject(course.getSubject());
        Specification<Course> typeSpec = CourseSpecifications.hasType(course.getType());
        Specification<Course> idSpec = CourseSpecifications.idIsNotEqual(id);
        Specification<Course> spec = subjectSpec.and(typeSpec).and(idSpec);
        return courseRepository.findAll(spec).stream()
                .filter(c -> c.getStudents().size() + 1 <= c.getMaxStudentCount())
                .collect(Collectors.toList());
    }
}
