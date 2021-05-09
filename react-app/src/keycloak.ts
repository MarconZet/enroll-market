import Keycloak from 'keycloak-js';

const keycloak: Keycloak.KeycloakInstance = Keycloak({
    url: `${process.env.REACT_APP_KEYCLOAK_PATH}/auth`,
    realm: "enroll-market",
    clientId: "spring-app",
});

export default keycloak;