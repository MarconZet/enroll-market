package pl.edu.agh.springapp.error;

import java.util.Arrays;
import java.util.stream.Collectors;

public class WrongPathVariableEnumValueException extends RuntimeException {

    public <E extends Enum<E>> WrongPathVariableEnumValueException(String wrongField, E [] enumValues) {
        super("Wrong enum " + enumValues[0].getClass().getName() + " value: " + wrongField + " Possible values: "
                + Arrays.stream(enumValues).map( e -> e.name())
                .collect(Collectors.joining(","))
        );
    }
}