package pl.edu.agh.springapp.data.dto;
import lombok.Data;

@Data
public class OfferDto {
    private Long id;
    private StudentDto student;
    private SubjectGroupDto givenSubjectGroup;
    private OfferConditionsDto dealConditions;
}
