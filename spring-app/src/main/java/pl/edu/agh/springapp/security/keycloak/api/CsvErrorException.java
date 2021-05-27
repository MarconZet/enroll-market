package pl.edu.agh.springapp.security.keycloak.api;

public class CsvErrorException extends RuntimeException {
    public CsvErrorException(String message) {
        super(message);
    }
}
