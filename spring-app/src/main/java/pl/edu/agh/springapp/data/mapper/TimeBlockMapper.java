package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockDto;
import pl.edu.agh.springapp.data.model.TimeBlock;

@Mapper(
        componentModel = "spring"
)
public interface TimeBlockMapper {
    @Mapping(source = "dayOfWeek", target = "day")
    TimeBlock timeBlockDtoToTimeBlock(TimeBlockDto timeBlockDto);

    @Mapping(source = "day", target = "dayOfWeek")
    TimeBlockDto timeBlockToTimeBlockDto(TimeBlock timeBlock);
}
