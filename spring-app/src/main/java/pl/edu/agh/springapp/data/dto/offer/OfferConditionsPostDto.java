package pl.edu.agh.springapp.data.dto.offer;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockDto;
import pl.edu.agh.springapp.data.dto.timeBlock.TimeBlockPostDto;

import java.util.List;

@Data
public class OfferConditionsPostDto {
    private List<Long> teacherIds;
    private List<TimeBlockPostDto> timeBlocks;
}
