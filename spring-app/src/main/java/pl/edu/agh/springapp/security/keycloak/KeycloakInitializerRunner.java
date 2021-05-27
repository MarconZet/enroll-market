package pl.edu.agh.springapp.security.keycloak;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.security.keycloak.api.KeycloakUserInfo;

import java.util.*;
import java.util.stream.Collectors;

import static pl.edu.agh.springapp.security.WebSecurityConfig.STUDENT_ROLE;

@Slf4j
@RequiredArgsConstructor
@Component
@Profile("security")
public class KeycloakInitializerRunner implements CommandLineRunner {
    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;
    @Value("${keycloak.realm}")
    private String keycloakRealm;
    @Value("${keycloak.resource}")
    private String keycloakResource;
    @Value("${enroll-market.app-redirect-url}")
    private String appRedirectUrl;

    private final Keycloak keycloakAdmin;
    private final Environment environment;

    @Override
    public void run(String... args) {
        boolean dev = Arrays.asList(environment.getActiveProfiles()).contains("dev");

        Optional<RealmRepresentation> representationOptional = keycloakAdmin.realms().findAll().stream()
                .filter(r -> r.getRealm().equals(keycloakRealm))
                .findAny();

        if (representationOptional.isPresent() && !dev) {
            log.info("Found already pre-configured '{}' realm", keycloakRealm);
            return;
        }

        if (representationOptional.isPresent()) {
            log.info("Removing already pre-configured '{}' realm", keycloakRealm);
            keycloakAdmin.realm(keycloakRealm).remove();
        }

        createRealm(dev);
    }

    private void createRealm(boolean createUsers) {
        log.info("Initializing '{}' realm in Keycloak ...", keycloakRealm);

        RealmRepresentation realmRepresentation = new RealmRepresentation();
        realmRepresentation.setRealm(keycloakRealm);
        realmRepresentation.setEnabled(true);
        realmRepresentation.setRegistrationAllowed(false);

        var studentRole = new RoleRepresentation("student", "Student role", false);
        var adminRole = new RoleRepresentation("admin", "Admin role", false);
        var rolesRepresentation = new RolesRepresentation();
        rolesRepresentation.setRealm(Arrays.asList(studentRole, adminRole));
        realmRepresentation.setRoles(rolesRepresentation);

        // Client
        ClientRepresentation clientRepresentation = new ClientRepresentation();
        clientRepresentation.setClientId(keycloakResource);
        clientRepresentation.setDirectAccessGrantsEnabled(true);
        clientRepresentation.setDefaultRoles(new String[]{STUDENT_ROLE});
        clientRepresentation.setPublicClient(true);
        clientRepresentation.setRedirectUris(Collections.singletonList(appRedirectUrl));
        clientRepresentation.setWebOrigins(Collections.singletonList("*"));

        ProtocolMapperRepresentation mapperRepresentation = new ProtocolMapperRepresentation();
        mapperRepresentation.setName("Index mapper");
        mapperRepresentation.setProtocol("openid-connect");
        mapperRepresentation.setProtocolMapper("oidc-usermodel-attribute-mapper");
        mapperRepresentation.setConfig(
                Map.of("userinfo.token.claim", "true",
                        "id.token.claim", "true",
                        "access.token.claim", "true",
                        "claim.name", "index",
                        "jsonType.label", "String",
                        "user.attribute", "index")
        );

        clientRepresentation.setProtocolMappers(Collections.singletonList(mapperRepresentation));


        realmRepresentation.setClients(Collections.singletonList(clientRepresentation));

        // Users
        if (createUsers) {
            List<UserRepresentation> userRepresentations = TEST_USER_INFO.stream()
                    .map(KeycloakUserInfo::userRepresentation)
                    .collect(Collectors.toList());
            realmRepresentation.setUsers(userRepresentations);
        }

        // Create Realm
        keycloakAdmin.realms().create(realmRepresentation);

        // Testing
        if (createUsers) {
            var admin = TEST_USER_INFO.get(0);
            log.info("Testing getting token for '{}' ...", admin.getUsername());

            Keycloak keycloakEnrollMarket = KeycloakBuilder.builder().serverUrl(keycloakServerUrl)
                    .realm(keycloakRealm).username(admin.getUsername()).password(admin.getPassword())
                    .clientId(keycloakResource).build();

            log.info("'{}' token: {}", admin.getUsername(), keycloakEnrollMarket.tokenManager().grantToken().getToken());
            log.info("'{}' initialization completed successfully!", keycloakRealm);
        }

    }

    private static final List<KeycloakUserInfo> TEST_USER_INFO = Arrays.asList(
            new KeycloakUserInfo("admin", "pass", "Marta", "Słomka", "123456", true),
            new KeycloakUserInfo("user1", "Śmieszek", "Melisa", "797955"),
            new KeycloakUserInfo("user2", "Kazimierz", "Siodełko", "313414"),
            new KeycloakUserInfo("user3", "Brandon", "Kwiatek", "222999"),
            new KeycloakUserInfo("user4", "Beniamin", "Wystrzał", "232595")
    );
}
