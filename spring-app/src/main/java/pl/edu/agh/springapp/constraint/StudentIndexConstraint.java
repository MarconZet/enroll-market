package pl.edu.agh.springapp.constraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = StudentIndexValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface StudentIndexConstraint {
    String message() default "Invalid index number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}