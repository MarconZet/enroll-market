package pl.edu.agh.springapp.domain.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;

    public TeacherAllDto newTeacher(TeacherPostDto teacherPostDto) {
        Teacher teacher = teacherMapper.teacherPostDtoToTeacher(teacherPostDto);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return teacherMapper.teacherToTeacherAllDto(savedTeacher);
    }

    public Page<TeacherAllDto> getAllTeachers(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return teacherRepository.findAll(paging).map(teacherMapper::teacherToTeacherAllDto);
    }

    public TeacherAllDto getTeacherWithId(Long id) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Teacher.class, id));
        return teacherMapper.teacherToTeacherAllDto(teacher);
    }
}
