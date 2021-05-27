package pl.edu.agh.springapp.security.keycloak.api;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.InputStream;

@Profile("security")
@Controller
@RequiredArgsConstructor
public class KeycloakController {
    private final KeycloakService keycloakService;

    @PostMapping("/keycloak/students")
    public ResponseEntity<String> createKeycloakStudents(InputStream dataStream) {
        try {
            keycloakService.addUsers(dataStream);
            return ResponseEntity.ok().build();
        } catch (CsvErrorException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/keycloak/students")
    public ResponseEntity<String> deleteKeycloakStudents() {
        keycloakService.deleteUsers();
        return ResponseEntity.ok().build();
    }
}
