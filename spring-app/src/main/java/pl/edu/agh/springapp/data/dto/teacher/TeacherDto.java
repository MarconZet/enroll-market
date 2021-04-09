package pl.edu.agh.springapp.data.dto.teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDto {
    private Long id;

    private String name;
    private String surname;
    private String emailAddress;
}
