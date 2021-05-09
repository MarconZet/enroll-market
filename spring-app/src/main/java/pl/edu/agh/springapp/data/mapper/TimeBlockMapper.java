package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockDto;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockPostDto;
import pl.edu.agh.springapp.data.model.TimeBlock;

@Mapper(
        componentModel = "spring"
)
public interface TimeBlockMapper {
    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    @Mapping(target = "endTime", dateFormat = "HH:mm")
    TimeBlock timeBlockDtoToTimeBlock(TimeBlockDto timeBlockDto);

    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    @Mapping(target = "endTime", dateFormat = "HH:mm")
    TimeBlock timeBlockPostDtoToTimeBlock(TimeBlockPostDto timeBlockPostDto);

    @Mapping(source = "day", target = "dayOfWeek")
    TimeBlockDto timeBlockToTimeBlockDto(TimeBlock timeBlock);
}
