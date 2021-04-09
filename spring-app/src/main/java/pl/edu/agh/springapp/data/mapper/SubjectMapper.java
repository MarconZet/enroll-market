package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.SubjectShortDto;
import pl.edu.agh.springapp.data.model.Subject;

@Mapper(
        componentModel = "spring"
)
public interface SubjectMapper {
    Subject subjectShortDtoToSubject(SubjectShortDto subjectShortDto);
    SubjectShortDto subjectToSubjectShortDto(Subject subject);
}
