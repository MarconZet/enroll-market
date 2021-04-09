package pl.edu.agh.springapp.domein.subject;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.mapper.SubjectMapper;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.repository.SubjectRepository;

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

    public List<SubjectAllDto> getAllSubjects() {
        List<Subject> subjects = StreamSupport.stream(subjectRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return subjectMapper.subjectsToSubjectAllDtos(subjects);
    }

    public void deleteSubjectWithId(Long id) {
        subjectRepository.deleteById(id);
    }
}
