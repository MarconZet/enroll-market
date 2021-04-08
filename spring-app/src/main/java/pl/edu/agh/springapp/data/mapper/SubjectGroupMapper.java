package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.SubjectGroupDto;
import pl.edu.agh.springapp.data.model.SubjectGroup;

@Mapper(uses = {TeacherMapper.class})
public interface SubjectGroupMapper {
    @Mapping(source = "type", target = "subjectType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    SubjectGroupDto subjectGroupToSubjectGroupDto(SubjectGroup subjectGroup);

    @Mapping(source = "subjectType", target = "type")
    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    SubjectGroup subjectGroupDtoToSubjectGroup(SubjectGroupDto subjectGroupDto);
}
