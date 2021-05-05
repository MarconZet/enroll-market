package pl.edu.agh.springapp.security.dev;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.security.WebSecurityConfig;

import javax.ws.rs.Produces;
import java.util.*;
import java.util.stream.Collectors;

import static pl.edu.agh.springapp.security.WebSecurityConfig.ADMIN_ROLE;
import static pl.edu.agh.springapp.security.WebSecurityConfig.STUDENT_ROLE;

@Slf4j
@RequiredArgsConstructor
@Component
@Profile("dev")
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

    @Override
    public void run(String... args) {
        log.info("Initializing '{}' realm in Keycloak ...", keycloakRealm);

        Optional<RealmRepresentation> representationOptional = keycloakAdmin.realms().findAll().stream()
                .filter(r -> r.getRealm().equals(keycloakRealm)).findAny();
        if (representationOptional.isPresent()) {
            log.info("Removing already pre-configured '{}' realm", keycloakRealm);
            keycloakAdmin.realm(keycloakRealm).remove();
        }

        // Realm
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
        clientRepresentation.setRedirectUris(Collections.singletonList(/*appRedirectUrl*/"*"));

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
        List<UserRepresentation> userRepresentations = TEST_USER_INFO.stream().map(userInfo -> {
            // Client roles
            List<String> realmRoles = new LinkedList<>();
            realmRoles.add(STUDENT_ROLE);
            if (userInfo.getUsername().equals("admin")) {
                realmRoles.add(ADMIN_ROLE);
            }

            // User Credentials
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
            credentialRepresentation.setValue("pass");

            // User
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(userInfo.getUsername());
            userRepresentation.setEnabled(true);
            userRepresentation.setFirstName(userInfo.getFirstname());
            userRepresentation.setLastName(userInfo.getLastname());
            userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
            userRepresentation.setRealmRoles(realmRoles);
            userRepresentation.setAttributes(Map.of("index", Collections.singletonList(userInfo.getIndex())));

            return userRepresentation;
        }).collect(Collectors.toList());
        realmRepresentation.setUsers(userRepresentations);

        // Create Realm
        keycloakAdmin.realms().create(realmRepresentation);

        // Testing
        var admin = TEST_USER_INFO.get(0);
        log.info("Testing getting token for '{}' ...", admin.getUsername());

        Keycloak keycloakEnrollMarket = KeycloakBuilder.builder().serverUrl(keycloakServerUrl)
                .realm(keycloakRealm).username(admin.getUsername()).password("pass")
                .clientId(keycloakResource).build();

        log.info("'{}' token: {}", admin.getUsername(), keycloakEnrollMarket.tokenManager().grantToken().getToken());
        log.info("'{}' initialization completed successfully!", keycloakRealm);
    }

    @Data
    @AllArgsConstructor
    private static class TestUserInfo {
        private String username;
        private String firstname;
        private String lastname;
        private String index;
    }

    private static final List<TestUserInfo> TEST_USER_INFO = Arrays.asList(
            new TestUserInfo("admin", "Michael", "Angel", "777000"),
            new TestUserInfo("user1", "Sirzechs", "Lucifer", "666001"),
            new TestUserInfo("user2", "Serafall", "Leviathan", "666002"),
            new TestUserInfo("user3", "Ajuka", "Beelzebub", "666003"),
            new TestUserInfo("user4", "Falbium", "Asmodeus", "666004")
    );
}
