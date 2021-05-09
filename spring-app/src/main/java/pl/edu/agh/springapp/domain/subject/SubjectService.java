package pl.edu.agh.springapp.domain.subject;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.IdListDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.mapper.SubjectMapper;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.repository.SubjectRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;

    public SubjectShortDto newSubject(SubjectPostDto subjectPostDto) {
        Subject subject = subjectMapper.subjectPostDtoToSubject(subjectPostDto);
        Subject savedSubject = subjectRepository.save(subject);
        return subjectMapper.subjectToSubjectShortDto(savedSubject);
    }

    public Page<SubjectAllDto> getAllSubjects(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return subjectRepository.findAll(paging).map(subjectMapper::subjectToSubjectAllDto);
    }

    public IdListDto getTeachersOfSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new EntityNotFoundException(Subject.class, id);
        }
        List<Teacher> teachers = subjectRepository.findTeachersOf(id);
        return new IdListDto(teachers.stream().map(Teacher::getId).collect(Collectors.toList()));
    }

    public SubjectAllDto getSubjectWithId(Long id) {
        Subject subject = subjectRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Subject.class, id));
        return subjectMapper.subjectToSubjectAllDto(subject);
    }
}
