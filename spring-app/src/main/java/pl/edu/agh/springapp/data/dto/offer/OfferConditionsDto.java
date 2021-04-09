package pl.edu.agh.springapp.data.dto.offer;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockDto;

import java.util.List;

@Data
public class OfferConditionsDto {
    private Long id;

    private List<TeacherDto> teachers;
    private List<TimeBlockDto> timeBlocks;
}
