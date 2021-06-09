import Keycloak from 'keycloak-js';

const keycloak_path = process.env.REACT_APP_KEYCLOAK_PATH;

const keycloak: Keycloak.KeycloakInstance = Keycloak({
    url: `${keycloak_path}/auth`,
    realm: "enroll-market",
    clientId: "spring-app",
});

export default keycloak;