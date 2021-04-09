package pl.edu.agh.springapp.data.dto.timeBlock;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import pl.edu.agh.springapp.data.model.DayOfWeek;

import java.time.LocalTime;

@Data
public class TimeBlockDto {
    private Long id;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private String dayOfWeek;
}
