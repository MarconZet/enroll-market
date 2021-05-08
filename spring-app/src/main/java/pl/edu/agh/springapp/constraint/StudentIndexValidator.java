package pl.edu.agh.springapp.constraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StudentIndexValidator implements ConstraintValidator<StudentIndexConstraint, String> {

    @Override
    public void initialize(StudentIndexConstraint contactNumber) {
    }

    @Override
    public boolean isValid(String indexNumberField,
                           ConstraintValidatorContext cxt) {
        return indexNumberField != null && indexNumberField.matches("[0-9]+")
                && (indexNumberField.length() == 6);
    }

}