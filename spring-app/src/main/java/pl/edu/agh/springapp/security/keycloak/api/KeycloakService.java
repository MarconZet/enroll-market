package pl.edu.agh.springapp.security.keycloak.api;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import static pl.edu.agh.springapp.security.WebSecurityConfig.ADMIN_ROLE;

@Slf4j
@Service
@Profile("security")
@RequiredArgsConstructor
public class KeycloakService {
    private final CurrentUser currentUser;
    private final Keycloak keycloakAdmin;

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    public void addUsers(InputStream inputStream) {
        var users = csvToObjectList(inputStream);
        if (users.stream().anyMatch(KeycloakUserInfo::isAdmin)) {
            log.info("Creating admin by endpoint is not allowed");
            throw new CsvErrorException("Creating admin by this endpoint is not allowed");
        }

        validateRealm();
        var usersResource = keycloakAdmin.realm(keycloakRealm).users();
        users.forEach(x -> usersResource.create(x.userRepresentation()));

    }

    public void deleteUsers() {
        validateRealm();
        var usersResource = keycloakAdmin.realm(keycloakRealm).users();
        usersResource.list().stream()
                .filter(x -> !x.getAttributes().get("index").get(0).equals(currentUser.getIndex()))
                .map(UserRepresentation::getId)
                .forEach(usersResource::delete);
    }

    private void validateRealm() {
        boolean a = keycloakAdmin.realms().findAll().stream().anyMatch(r -> r.getRealm().equals(keycloakRealm));
        if (!a) {
            log.error("Missing keycloak realm");
            throw new RuntimeException("Missing keycloak realm");
        }
    }

    private List<KeycloakUserInfo> csvToObjectList(InputStream inputStream) {
        try {
            CsvSchema bootstrapSchema = CsvSchema.emptySchema().withHeader();
            Reader reader = new InputStreamReader(inputStream);
            CsvMapper mapper = new CsvMapper();
            mapper.schemaFor(KeycloakUserInfo.class).withHeader();

            MappingIterator<KeycloakUserInfo> it = mapper
                    .readerFor(KeycloakUserInfo.class)
                    .with(bootstrapSchema)
                    .readValues(reader);

            return it.readAll();
        } catch (IOException e) {
            log.info("Error occurred while parsing csv", e);
            throw new CsvErrorException("Error occurred while parsing csv");
        }
    }
}
