package pl.edu.agh.springapp.data.dto;

import lombok.Data;

import java.util.List;

@Data
public class OfferConditionsDto {
    private Long id;

    private List<TeacherDto> teachers;
    private List<TimeBlockDto> timeBlocks;
}
