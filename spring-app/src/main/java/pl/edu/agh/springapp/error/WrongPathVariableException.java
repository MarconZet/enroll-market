package pl.edu.agh.springapp.error;

import pl.edu.agh.springapp.data.model.CourseType;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class WrongPathVariableException extends RuntimeException {

    public WrongPathVariableException(boolean isWrongCriterion, String wrongField) {
        super(generateMessage(isWrongCriterion, wrongField));
    }

    private static String generateMessage(boolean isWrongCriterion, String field) {
        if (isWrongCriterion) {
            return "Wrong criterion name: " + field;
        } else {
            return "Wrong criterion value: " + field;
        }
    }
}