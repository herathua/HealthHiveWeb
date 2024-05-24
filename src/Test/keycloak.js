import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'YOUR_KEYCLOAK_URL/auth',
  realm: 'YOUR_REALM',
  clientId: 'YOUR_CLIENT_ID',
});

export default keycloak;
