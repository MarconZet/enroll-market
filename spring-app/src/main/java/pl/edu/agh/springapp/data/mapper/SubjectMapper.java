package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.model.Subject;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {CourseMapper.class, SubjectMapperResolver.class}
)
public interface SubjectMapper {
    Subject subjectShortDtoToSubject(SubjectShortDto subjectShortDto);
    Subject subjectPostDtoToSubject(SubjectPostDto subjectPostDto);
    List<Subject> subjectPostDtosToSubjects(List<SubjectPostDto> subjectPostDtos);
    SubjectShortDto subjectToSubjectShortDto(Subject subject);
    SubjectAllDto subjectToSubjectAllDto(Subject subject);
    List<SubjectAllDto> subjectsToSubjectAllDtos(List<Subject> subjects);
    Subject map(Long id);
}
