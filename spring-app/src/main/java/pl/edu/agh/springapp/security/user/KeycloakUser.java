package pl.edu.agh.springapp.security.user;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.IDToken;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.security.Principal;
import java.util.Map;

@Slf4j
@Primary
@Profile("security")
@SessionScope
@Component
public class KeycloakUser implements CurrentUser {
    private final String firstname;
    private final String surname;
    private final String index;

    public KeycloakUser() {
        String firstname, surname, index;
        firstname = surname = index = "";

        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext()
                .getAuthentication();

        final Principal principal = (Principal) authentication.getPrincipal();

        if (principal instanceof KeycloakPrincipal) {
            KeycloakPrincipal<KeycloakSecurityContext> keycloakPrincipal = (KeycloakPrincipal) principal;
            IDToken token = keycloakPrincipal.getKeycloakSecurityContext().getIdToken();

            firstname = token.getName();
            surname = token.getFamilyName();

            Map<String, Object> customClaims = token.getOtherClaims();
            if (customClaims.containsKey("index")) {
                index = String.valueOf(customClaims.get("index"));
            } else {
                log.error("Did not find index of user {}", token.getPreferredUsername());
            }
        } else {
            log.error("Unexpected principal type");
        }
        this.firstname = firstname;
        this.surname = surname;
        this.index = index;
    }

    @Override
    public String getFirstname() {
        return firstname;
    }

    @Override
    public String getSurname() {
        return surname;
    }

    @Override
    public String getIndex() {
        return index;
    }
}

