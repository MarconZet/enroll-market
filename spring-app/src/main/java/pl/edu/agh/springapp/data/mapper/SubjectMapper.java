package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.SubjectShortDto;
import pl.edu.agh.springapp.data.model.Subject;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {SubjectGroupMapper.class}
)
public interface SubjectMapper {
    Subject subjectShortDtoToSubject(SubjectShortDto subjectShortDto);
    Subject subjectPostDtoToSubject(SubjectPostDto subjectPostDto);
    SubjectShortDto subjectToSubjectShortDto(Subject subject);
    SubjectAllDto subjectToSubjectAllDto(Subject subject);
    List<SubjectAllDto> subjectsToSubjectAllDtos(List<Subject> subjects);
}
