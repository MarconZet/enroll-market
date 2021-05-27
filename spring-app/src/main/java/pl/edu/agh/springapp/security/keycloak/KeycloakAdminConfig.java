package pl.edu.agh.springapp.security.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("security")
public class KeycloakAdminConfig {

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${enroll-market.keycloak-admin-username}")
    private String keycloakAdminUsername;

    @Value("${enroll-market.keycloak-admin-password}")
    private String keycloakAdminPassword;

    @Bean
    Keycloak keycloakAdmin() {
        return KeycloakBuilder.builder()
                .serverUrl(keycloakServerUrl)
                .realm("master")
                .username(keycloakAdminUsername)
                .password(keycloakAdminPassword)
                .clientId("admin-cli")
                .build();
    }
}
