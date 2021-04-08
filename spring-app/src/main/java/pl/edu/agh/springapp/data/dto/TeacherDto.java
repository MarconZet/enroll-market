package pl.edu.agh.springapp.data.dto;

import lombok.Data;

@Data
public class TeacherDto {
    private Long id;

    private String name;
    private String surname;
    private String emailAddress;
}
