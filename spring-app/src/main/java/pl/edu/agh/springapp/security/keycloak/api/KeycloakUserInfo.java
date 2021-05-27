package pl.edu.agh.springapp.security.keycloak.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static pl.edu.agh.springapp.security.WebSecurityConfig.ADMIN_ROLE;
import static pl.edu.agh.springapp.security.WebSecurityConfig.STUDENT_ROLE;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeycloakUserInfo {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String index;
    private boolean admin;

    public KeycloakUserInfo(String username, String firstname, String lastname, String index) {
        this(username, "pass", firstname, lastname, index, false);
    }

    public UserRepresentation userRepresentation() {
        List<String> realmRoles = new LinkedList<>();
        realmRoles.add(STUDENT_ROLE);
        if (admin) {
            realmRoles.add(ADMIN_ROLE);
        }

        // User Credentials
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(password);

        // User
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(username);
        userRepresentation.setEnabled(true);
        userRepresentation.setFirstName(firstname);
        userRepresentation.setLastName(lastname);
        userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
        userRepresentation.setRealmRoles(realmRoles);
        userRepresentation.setAttributes(Map.of("index", Collections.singletonList(this.getIndex())));

        return userRepresentation;
    }
}
