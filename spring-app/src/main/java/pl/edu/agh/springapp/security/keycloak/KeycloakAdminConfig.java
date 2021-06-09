package pl.edu.agh.springapp.security.keycloak;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
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
        var keycloak = KeycloakBuilder.builder()
                .serverUrl(keycloakServerUrl)
                .realm("master")
                .username(keycloakAdminUsername)
                .password(keycloakAdminPassword)
                .clientId("admin-cli")
                .build();
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForEntity(keycloakServerUrl + "/auth", String.class);
        } catch (RestClientException e) {
            log.info("Unable to connect to Keycloak instance, sleeping 10 seconds");
            try {
                Thread.sleep(10 * 1000);
            } catch (InterruptedException interruptedException) {
                interruptedException.printStackTrace();
            }
        }
        return keycloak;
    }
}
