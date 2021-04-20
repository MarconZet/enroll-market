# How to deploy keycloak
1. `docker run -d -p 9000:8080 -p 9001:8443 jboss/keycloak:12.0.4`
2. `docker exec <CONTAINER> /opt/jboss/keycloak/bin/add-user-keycloak.sh -u root -p root`
3. `docker restart`
4. Got to `localhost:9000`
5. Log in, user `root`, password `root`
6. Create realm enroll-market
7. Import realm-export.json
8. Now you can create users
    + There are two custom roles: student and admin
    + All student users should hava name, surname and index
    + Passwords must be set manually
