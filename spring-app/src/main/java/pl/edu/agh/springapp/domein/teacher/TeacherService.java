package pl.edu.agh.springapp.domein.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.TeacherDto;
import pl.edu.agh.springapp.data.dto.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.SubjectGroup;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.SubjectGroupRepository;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;

    public TeacherDto newTeacher(TeacherPostDto teacherPostDto) {
        Teacher teacher = teacherMapper.teacherPostDtoToTeacher(teacherPostDto);
        Teacher savedTeacher = teacherRepository.save(teacher);
        TeacherDto result = teacherMapper.teacherToTeacherDto(savedTeacher);
        return result;
    }

    public List<TeacherDto> getAllTeachers() {
        List<Teacher> teachers = StreamSupport.stream(teacherRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return teacherMapper.teachersToTeacherDtos(teachers);
    }

    public void deleteTeacherWithId(Long id) {
        teacherRepository.deleteById(id);
    }
}
