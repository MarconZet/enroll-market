package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.TimeBlockDto;
import pl.edu.agh.springapp.data.model.TimeBlock;

@Mapper
public interface TimeBlockMapper {
    @Mapping(source = "dayOfWeek", target = "day")
    TimeBlock timeBlockDtoToTimeBlock(TimeBlockDto timeBlockDto);

    @Mapping(source = "day", target = "dayOfWeek")
    TimeBlockDto timeBlockToTimeBlockDto(TimeBlock timeBlock);
}
