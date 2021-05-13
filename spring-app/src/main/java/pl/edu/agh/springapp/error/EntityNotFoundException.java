package pl.edu.agh.springapp.error;

import org.springframework.util.StringUtils;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Class clazz, Long id) {
        super(EntityNotFoundException.generateMessage(clazz.getSimpleName(), id));
    }

    public EntityNotFoundException(String message) {
        super(message);
    }

    private static String generateMessage(String entity, Long id) {
        return StringUtils.capitalize(entity) +
                " was not found for id: " +
                id;
    }

}