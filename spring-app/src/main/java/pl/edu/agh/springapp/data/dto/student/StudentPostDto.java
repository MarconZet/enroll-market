package pl.edu.agh.springapp.data.dto.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPostDto {
    private String name;
    private String surname;
    private boolean isAdmin;
}
