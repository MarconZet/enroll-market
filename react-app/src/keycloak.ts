import Keycloak from 'keycloak-js';

const keycloak_path = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_KEYCLOAK_PATH : (window as any).KEYCLOAK_PATH;

const keycloak: Keycloak.KeycloakInstance = Keycloak({
    url: `${keycloak_path}/auth`,
    realm: "enroll-market",
    clientId: "spring-app",
});

export default keycloak;