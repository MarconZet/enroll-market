package pl.edu.agh.springapp.data.dto.student;

import lombok.Data;

@Data
public class StudentDto {
    private Long id;
    private String name;
    private String surname;
    private boolean isAdmin;
}
